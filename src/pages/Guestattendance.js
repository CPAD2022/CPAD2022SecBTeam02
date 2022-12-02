import React from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { ScrollView } from "react-native-gesture-handler";
import { db } from '../utils/Firebase';


export default class GuestAttendance extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            summary: {},
            isLoading: true,
            subjects: [],
            student: {
                id: null,
                name: null,
                usn: null,
                batch: null
            },
            max: 0,
            attendance: []
        }
    }
    async getAttendance(){
        const batchReference = db.collection('batch').doc(this.state.student.batch)
        const subjects = await db.collection("subject").where("batch", "==", batchReference).get()
        const student = await db.collection('student').doc(this.state.student.id).get()
        for(let i=0;i < subjects.docs.length; i++){
            let v = subjects.docs[i]
            const attendanceRef = await db.collection('attendance').where("subject", "==", v.ref).where("student", "==", student.ref).get()
            const attendance = attendanceRef.docs
            let total = attendance.length
            let present = attendance.filter(v => v.get("status")).length
            this.state.attendance.push({
                "id": v.id,
                "name": v.get("name"),
                "total": total,
                "present": present,
                "percentage": `${((present / (total > 0 ? total : 1)) * 100).toFixed(2) }%`
            })
        }
    }

    componentDidMount(){
        db.collection('student').doc(this.props.student).get().then((s) => {
            this.setState({
                student: {
                    "id": s.id,
                    name: s.get("name"),
                    usn: s.get("usn"),
                    batch: s.get("batch").id,
                }
            })
            this.getAttendance().then(() => {
               this.setState({
                    isLoading: false
               })
            })
        })
    }
}