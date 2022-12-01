import React from "react";
import { View, Text, StyleSheet, TextInput ,ActivityIndicator, Dimensions } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { ScrollView } from "react-native-gesture-handler";
import { db } from '../utils/Firebase';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'


export default class StudentAnalytics extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            subjects: [],
            summary: {},
            isLoading: true,
            attendance: {},
            student: {
                id: null,
                name: null,
                usn: null,
                batch: null
            },
            max: 0,
            internals: {}
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
            this.state.attendance[v.get('name')] = {
                "id": v.id,
                "name": v.get("name"),
                "total": total,
                "present": present,
                "percentage": Number.parseFloat(((present / (total > 0 ? total : 1)) * 100).toFixed(2))
            }
        }
    }

    async getInternals(){
        const batchReference = db.collection('batch').doc(this.state.student.batch)
        const subjects = await db.collection("subject").where("batch", "==", batchReference).get()
        const student = await db.collection('student').doc(this.state.student.id).get()
        for(let i=0;i < subjects.docs.length; i++){
            let internalsRef = await db.collection('internals').where("subject", "==", subjects.docs[i].ref).get()
            let internals = internalsRef.docs
            if(this.state.internals[subjects.docs[i].get('name')] === undefined){
                this.state.internals[subjects.docs[i].get('name')] = []
            }
            for(let j=0; j < internals.length; j++){
                let marks = await db.collection('marks').where("internal", "==", internals[j].ref).where("student", "==", student.ref).get()
                if(marks.docs.length){
                    this.state.internals[subjects.docs[i].get('name')].push({
                        "id": marks.docs[0].id,
                        "name": subjects.docs[i].get("name"),
                        "ia": internals[j].get("name"),
                        "marks": marks.docs[0].get("marks"),
                        "max": internals[j].get("max")
                    })
                }
            }
            
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
            this.getInternals().then(() => {
               this.getAttendance().then(() => {
                   console.log(this.state)
                    this.setState({
                        isLoading: false
                })
               })
            })
        })
    }

    

    render(){
        return (
            <View style={styles.check}>
            <ScrollView>
            {!this.state.isLoading ? Object.keys(this.state.internals).map(v => {

                return (
                    this.state.internals[v].length > 0 ? <View>
  <View>
    <Text>Subject: {v}</Text>
  </View>
   <LineChart
    fromZero
    
    data={{
      labels: [...this.state.internals[v].map(l => l.ia)],
      datasets: [{
        data: [
          ...this.state.internals[v].map(l => l.marks)
        ],
      }]
    }}
    width={Dimensions.get('window').width * 0.9} // from react-native
    height={220}
    chartConfig={{
    //   backgroundColor: '#e26a00',
    //   backgroundGradientFrom: '#fb8c00',
    //   backgroundGradientTo: '#ffa726',
    fillShadowGradient: 'transparent',
    fillShadowGradientOpacity: 0,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> 
  <BarChart
    fromZero
    
    data={{
      labels: ['Conducted', 'Present'],
      datasets: [{
        data: [
            this.state.attendance[v].total, this.state.attendance[v].present
        ],
      }]
    }}
    width={Dimensions.get('window').width * 0.9} // from react-native
    height={220}
    chartConfig={{
        backgroundColor: '#e26a00',
      backgroundGradientFrom: '#e26a00',
      backgroundGradientTo: '#e26a00',
        fillShadowGradient: 'blue',
    fillShadowGradientOpacity: 1,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> 
</View> : null 
            )}) : <ActivityIndicator size="large" color="#1273de"
            style={styles.activityindicator} />}
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityindicator:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:250
    },
    check:{
        marginTop: 60,
        marginLeft: 24,
        marginRight: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: 240,
        marginTop: 50,
        height: 250,
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e4463a',
        
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    
       
})