import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sub } from 'react-native-reanimated';
import { db } from '../utils/Firebase'

export default class StackAttendance extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            currentStudent: 0
        }
    }

    markAttendance = (student, subject, status) => {
        let studentReference = db.collection('student').doc(`${student}`)
        let subjectReference = db.collection('subject').doc(`${subject}`)
        let timestamp = new Date()
        db.collection('attendance').add({
            "student": studentReference,
            "subject": subjectReference,
            "timestamp": timestamp,
            "status": status
        })
    }

    presentButtonAction = () => {
        let currentStudent = this.state.students[this.state.currentStudent]
        this.markAttendance(currentStudent.id, this.props.subject, true)
        this.setState({
            currentStudent: this.state.currentStudent + 1
        })
        this.swiper.swipeRight()
    }

    absentButtonAction = () => {
        let currentStudent = this.state.students[this.state.currentStudent]
        this.markAttendance(currentStudent.id, this.props.subject, false)
        this.setState({
            currentStudent: this.state.currentStudent + 1
        })
        this.swiper.swipeLeft()
    }

    componentDidMount(){
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
        return(
            <View style={{
                marginTop: 150
            }}>
               <View>
               <CardStack
               ref={swiper => {
                   this.swiper = swiper
                }} 
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                        position: "relative"
                    }} 
                    renderNoMoreCards={() => {
                        return <Text style={{
                            fontSize: 28,
                            color: 'black',
                            textAlign: 'center',
                            marginTop: 15,
                            fontWeight: 'bold',
                        }}>{"No more students"}</Text>
                    }}
                    >
                    {this.state.students.map(v => {
                        return <Card 
                                style={styles.card } 
                                key={v.id}>
                                <Text style={
                                    styles.text
                                }>Name: {v.name}</Text>
                                <Text style={
                                    styles.text
                                }>USN: {v.usn}</Text>
                            </Card>
                    })}
                </CardStack>
               </View>
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity 
                    disabled={this.state.currentStudent == this.state.students.length}
                    onPress={this.presentButtonAction}
                    style={
                        styles.presentButton
                    }>
                        <Text style={{
                            fontSize: 21,
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 12,
                            fontWeight: '600',
                        }}>Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    disabled={this.state.currentStudent == this.state.students.length}
                    onPress={this.absentButtonAction}
                    style={
                        styles.absentButton
                    }>
                        <Text style={{
                            fontSize: 21,
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 12,
                            fontWeight: '600',
                        }}>Absent</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 240,
        height: 360,
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e4463a'
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    presentButton: {
        marginTop: 380,
        marginLeft: 48,
        height: 48,
        width: 120,
        borderRadius: 6,
        fontSize: 21,
        fontWeight: '600',
        backgroundColor: 'green'
    },
    absentButton: {
        marginTop: 380,
        marginRight: 48,
        borderRadius: 6,
        height: 48,
        width: 120,
        backgroundColor: 'red'
    }
})