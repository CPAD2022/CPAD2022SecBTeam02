import React, { Component } from 'react';
import { StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import 'firebase/firebase-storage';
import Card from './card';

export default class Addattendance extends Component {

    constructor(props){
        super(props)
        this.state = {
            students: []
        }
    }


    componentDidMount(){
        let db = firebase.firestore()
        let batchReference = db.collection("batch").doc(`${this.props.batch}`)
        db.collection("student").where("batch", '==', batchReference).get().then(snapshot => {
            let students = []
            snapshot.docs.forEach(student => {
                students.push({
                    "id" : student.id,
                    "name": student.get("name"),
                    "usn": student.get("usn")
                })
            } )
            
            this.setState({
                students: students
            })
        })
    }
    render(){
        return (
            <View>
                {this.state.students.map(student => {
                    
                    return <Card key={student.id} name={student.name} usn={student.usn}></Card>
                })}
            </View>
        )
    }
    }
    