import React from 'react';
import { Text, View, Button, ScrollView , ActivityIndicator,StyleSheet} from 'react-native';
import { db } from '../utils/Firebase';
import moment from 'moment-timezone'
import StudentCard from '../components/StudentCard';
import { cos } from 'react-native-reanimated';
moment.tz.setDefault("Asia/Kolkata")



export default class GetAttendance extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            summary: {},
            max: 0,
            filteredStudents: [],
            isLoading:true,
        }
    }

    formatDates = (startDate, endDate) => {
        let newStartDate = new Date(startDate)
        newStartDate.setHours(0, 0, 0, 0)
        let newEndingDate = new Date(endDate)
        newEndingDate.setHours(23, 59, 59, 9999)
        return {
            startDate: new Date(newStartDate),     
            endDate: new Date(newEndingDate)
        }
        
    }
    calculatePercentile = (ref, index) => {
        let _percentile = ref.percentage / this.state.max * 100
        let _filtered = this.state.filteredStudents
        _filtered[index]["percentile"] = _percentile
        this.setState({
            filteredStudents: _filtered
        })
    }

    filterBasedOnPercentage = () => {
        let filteredStudents = Object.values(this.state.summary).filter(v => {
            if(v.percentage > this.state.max){
                this.setState({
                    max: v.percentage > 0 ? v.percentage : 1
                })
            }
            return Number.parseFloat(v.percentage || 0) <= Number.parseFloat(this.props.percentage || 0)
        })
        this.setState({
            filteredStudents: filteredStudents
        })
    }
}
filterAttendance = () => {
    let finalSummary = {}
    Object.keys(this.state.summary).forEach(record => {
        let studentDetails = this.state.students.filter((v) => {
            return v.id === record
        })[0]
        let studentSummary = this.state.summary[`${record}`]
        let totalClases = studentSummary.length
        let presentClasses = studentSummary.filter(v => v === true).length
        finalSummary[`${record}`] = {
            "id": record,
            "name": studentDetails.name,
            "usn": studentDetails.usn,
            "totalClasses": totalClases,
            "presentClasses": presentClasses,
            "percentage": (presentClasses * 100 / totalClases)
        }
    })
    this.setState({
        summary: finalSummary
    })
    this.filterBasedOnPercentage()
    this.state.filteredStudents.forEach((v, i) => this.calculatePercentile(v, i))
}

calculateAttendance = async() => {
    let { startDate, endDate } = this.formatDates(this.props.startDate, this.props.endDate)
    let subjectReference = await db.collection('subject').doc(this.props.subject)
    let snapshot = await db.collection('attendance').where("timestamp", ">=", startDate).where("timestamp", "<=", endDate).where("subject", "==", subjectReference).get()
    let docs = snapshot.docs
    for(let i = 0; i < docs.length; i++){
        let student = await db.collection('student').doc(docs[i].get("student").id).get()
        this.setState({
            students: this.state.students.concat({
                "id": student.id,
                "name": student.get("name"),
                "usn": student.get("usn"),
                "status": docs[i].get("status")
            })
        })
    }
}