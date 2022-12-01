import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sub } from 'react-native-reanimated';
import { db } from '../utils/Firebase'

export default class StackInternals extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            currentStudent: 0
        }
    }

    submitMarks = (student, internal, marks) => {
        let studentReference = db.collection('student').doc(`${student}`)
        console.log(internal)
        let internalReference = db.collection('internals').doc(`${internal}`)
        let timestamp = new Date()
        db.collection('marks').add({
            "student": studentReference,
            "internal": internalReference,
            "updated_at": timestamp,
            "marks": marks
        })
    }

    submitMarksAction = () => {
        let currentStudent = this.state.students[this.state.currentStudent]
        console.log(this.props.ia)
        this.submitMarks(currentStudent.id, this.props.ia, currentStudent.marks)
        this.setState({
            currentStudent: this.state.currentStudent + 1
        })
        this.swiper.swipeRight()
    }

    componentDidMount(){
        let batchReference = db.collection("batch").doc(`${this.props.batch}`)
        db.collection("student").where("batch", '==', batchReference).get().then(snapshot => {
            let students = []
            snapshot.docs.forEach(student => {
                students.push({
                    "id" : student.id,
                    "name": student.get("name"),
                    "usn": student.get("usn"),
                    "marks": 0
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
                marginTop: 150,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center"
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
                            fontSize: 22,
                            color: 'black',
                            textAlign: 'center',
                            marginTop: 12,
                            fontWeight: 'bold',
                        }}>{"No more students"}</Text>
                    }}
                    >
                    {this.state.students.map((v, i) => {
                        return (
                        <Card 
                            style={styles.card } 
                            key={v.id}>
                            <Text style={
                                styles.text
                            }>Name: {v.name}</Text>
                            <Text style={
                                styles.text
                            }>USN: {v.usn}</Text>

                            <TextInput style={styles.inputbox} 
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Enter marks"
                                placeholderTextColor= "#4b6156"
                                keyboardType={"number-pad"}
                                onChangeText={marks =>{
                                    let _students = this.state.students
                                    _students[i]["marks"] = Number.parseInt(marks || 0)
                                    this.setState({
                                        students: _students
                                    })
                                }}
                            />
                        </Card>
                        )
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
                    onPress={this.submitMarksAction}
                    style={
                        styles.presentButton
                    }>
                        <Text style={{
                            fontSize: 21,
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 12,
                            fontWeight: '600',
                        }}>Submit</Text>
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
        height: 48,
        width: 120,
        borderRadius: 6,
        fontSize: 21,
        fontWeight: '600',
        backgroundColor: 'green'
    },
    inputbox:{
        width: '100%',
        height:50,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius:25,
        fontWeight:'500',
        paddingHorizontal:20,
        fontSize:22,
        color:"#202824",
        marginVertical:10,
        marginHorizontal: 12,
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