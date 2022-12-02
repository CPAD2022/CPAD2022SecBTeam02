
import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity,Text,Dimensions, ActivityIndicator,ImageBackground,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { db } from '../utils/Firebase';
import { Dropdown } from 'react-native-material-dropdown';
const width = Dimensions.get('window').width

export default class SelectInternalsForMarks extends Component {

  constructor(props){
    super(props);
    this.state = {
      batches: [],
      subjects: [],
      internals: [],
      isLoading: true
    }

  }

  retrieveSubjects = (batch) => {
    let batchReference = db.collection('batch').doc(batch)
    db.collection('subject').where('batch', '==', batchReference).get().then(snapshot => {
      let docs = snapshot.docs;
      let currentSubjects = []
      docs.forEach(subject => {
        currentSubjects.push({
          "id": subject.id,
          "name": subject.get("name")
        })
      })
      this.setState({
        subjects: currentSubjects,
        isLoading: false
      })
      if(currentSubjects.length > 0){
        this.setState({
          selectedSubject: currentSubjects[0].id
        })
        this.retrieveInternals(currentSubjects[0].id)
      }
    })
  }

  retrieveInternals = (batch) => {
    let subjectReference = db.collection('subject').doc(batch)
    db.collection('internals').where('subject', '==', subjectReference).get().then(snapshot => {
      let docs = snapshot.docs;
      let currentInternals = []
      docs.forEach(internal => {
        currentInternals.push({
          "id": internal.id,
          "name": internal.get("name")
        })
      })
      this.setState({
        internals: currentInternals,
        isLoading: false
      })
      if(currentInternals.length > 0){
        this.setState({
          selectedInternal: currentInternals[0].id
        })
      }
    })
  }

  formatData = (data) => {
    return data.map(e => {
      return {
        "value": e.id,
        "label": e.name
      }
    } )
  }
}