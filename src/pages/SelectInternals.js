port React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity,Text, Dimensions, LogBox,  Picker, ActivityIndicator,ImageBackground,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { db } from '../utils/Firebase';
import { Dropdown } from 'react-native-material-dropdown';
const width = Dimensions.get('window').width

export default class Addbatch extends Component {

  constructor(props){
    super(props);
    this.state = {
      batches: [],
      selectedBatch:"",
      subjects: [],
      selectedSubject: "",
      internals:[],
      selectedInternals: "",
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
  }}