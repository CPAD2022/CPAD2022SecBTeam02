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


export default class TeacherAnalytics extends React.Component {

    constructor(props){
        super(props);
        this.subject = null;
        this.batch = null;
        this.state = {
            students: [],
            subjects: [],
            summary: {},
            isLoading: true,
            internals: {
            },
            attendance: {},
            max: 0,
        }
    }


    async getAttendance(){
        const batchReference = db.collection('batch').doc(this.props.batch)
        const subject = await db.collection("subject").doc(this.props.subject).get()
        const students = await db.collection("student").where("batch", "==", batchReference).get()
        for(var student of students.docs){
            if(this.state.attendance[subject.get("name")] === undefined){
              this.state.attendance[subject.get("name")] = []
            }
            const attendanceRef = await db.collection('attendance').where("subject", "==", subject.ref).where("student", "==", student.ref).get()
            const attendance = attendanceRef.docs
            let total = attendance.length
            let present = attendance.filter(v => v.get("status")).length
            this.state.attendance[subject.get("name")].push({
                "id": student.id,
                "name": student.get("name"),
                "total": total,
                "present": present,
                "percentage": Number.parseFloat(((present / (total > 0 ? total : 1)) * 100).toFixed(2))
            })
        }
    }

    async componentDidMount(){
      /******************** */
      this.getAttendance().then(v => {
        this.setState({
          isLoading: false
        })
      });
    }

    

    render(){
        return (
            <View style={styles.check}>
            <ScrollView>
            {!this.state.isLoading ? Object.keys(this.state.attendance).map(v => {

                return (
                  this.state.attendance[v].length > 0 ? <View>
  <View>
    <Text>Subject: {v}</Text>
  </View>
   <BarChart
    fromZero
    bezier
    data={{
      labels: [...this.state.attendance[v].map(l => l.name)],
      datasets: [{
        data: [
          ...this.state.attendance[v].map(l => l.percentage)
        ],
      }]
    }}

    width={Dimensions.get('window').width * 0.9} // from react-native
    height={220}
    
    chartConfig={{
    //   backgroundColor: '#e26a00',
    //   backgroundGradientFrom: '#fb8c00',
    //   backgroundGradientTo: '#ffa726',
    fillShadowGradient: 'white',
    fillShadowGradientOpacity: 1,
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
  <LineChart
    fromZero
    bezier
    data={{
      labels: [...this.state.attendance[v].map(l => l.name)],
      datasets: [{
        data: [
          ...this.state.attendance[v].map(l => l.percentage)
        ],
      }]
    }}

    width={Dimensions.get('window').width * 0.9} // from react-native
    height={220}
    
    chartConfig={{
    //   backgroundColor: '#e26a00',
    //   backgroundGradientFrom: '#fb8c00',
    //   backgroundGradientTo: '#ffa726',
    fillShadowGradient: 'white',
    fillShadowGradientOpacity: 0.5,
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