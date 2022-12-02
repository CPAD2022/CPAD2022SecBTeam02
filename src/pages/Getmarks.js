import React from 'react';
import { Text, ScrollView,View } from 'react-native';
import MarksCard from '../components/MarksCard';
import { db } from '../utils/Firebase'


export default class GetMarks extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            students: []
        }
    }

    getMarks = async (internal) => {
        let _students = []
        let marksCollection = await db.collection("marks").where("internal", "==", internal).get()
        let docs = marksCollection.docs
        for(let i = 0; i < docs.length; i++){
            let v = docs[i]
            let studentReference = await db.collection("student").doc(`${v.get("student").id}`).get() 
            _students.push({
                "id": studentReference.id,
                "name": studentReference.get("name"),
                "usn": studentReference.get("usn"),
                marks: v.get("marks"),
            })
        }
        return _students
    }

    componentDidMount(){
        let internalReference = db.collection('internals').doc(this.props.internal)
        this.getMarks(internalReference).then((v, e) => {
            this.setState({
                students: v
            })
        })
    }

    render(){
        return(
            <ScrollView>
                <View style={{
                    marginTop: 48,
                    paddingHorizontal: 20,
                   
                }}>
            {this.state.students.map(student => {
                return (<MarksCard key={student.id} name={student.name} usn={student.usn}
                marks={student.marks}/>)
            })}
             </View>
            </ScrollView>
        )
    }

   
}
