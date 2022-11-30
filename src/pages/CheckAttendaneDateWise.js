import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/Kolkata")
import DateRangePicker from "react-native-daterange-picker";
import {View, StyleSheet, TouchableOpacity, TextInput, Text,  Picker, Button, ActivityIndicator,ImageBackground, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { db } from '../utils/Firebase'
import { FontAwesome } from '@expo/vector-icons';

export default class CheckAttendaneDateWise extends Component {

  constructor(props){
    super(props);
    let date = new Date()
    this.state = {
      batches: [],
      selectedBatch:"",
      subjects: [],
      selectedSubject: "",
      startDate: moment(date),
      endDate: moment(date),
      displayedDate: moment(date),
      isLoading: true,
      percentage: 100
    }
  }

  setDateRange = (dates) => this.setState({
      ...dates
  })

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

  componentDidMount(){
    db.collection("batch").get().then(snapshot => {
      let batches = []
      snapshot.docs.forEach((doc) => {
        batches.push(
          {
            "name" : doc.get("name"),
            "id": doc.id
          }
        )
        
      })
      this.setState(
        {
          batches: batches,
          selectedBatch: batches[0].id,
          isLoading: false,
          
        }
      )
      if(batches.length > 0){
        this.setState({
          selectedBatch: batches[0].id
        })
        this.retrieveSubjects(batches[0].id)
      }

    })
  }
  
  render() {
return(
  <View style={styles.maincontainer}>
    <View >
      <ImageBackground 
          style={styles.backgroundimage}
          source={require('../images/pic.jpg')}>

    <Text style={{
      marginTop:120,
      marginBottom:20,
      fontSize:25,
      fontWeight:'bold',
      textAlign:'center',
    }}>
    Select batch
    </Text>
    { this.state.isLoading ? <ActivityIndicator size="large" color="#1273de" /> : 
 <Dropdown
    style={{fontSize:21,height:30}}
    labelFontSize={20}
    label={'Choose batch'}
    data={this.formatData(this.state.batches)}
    useNativeDriver={true}
    value={this.state.selectedBatch}
    onChangeText={(v) => {
        this.setState({
         selectedBatch: v,
         isLoading: true
        })
     this.retrieveSubjects(v)
 }}
 /> }
    
    {this.state.isLoading ? <ActivityIndicator size="small" color="#1273de" /> : 

<Dropdown
    style={{fontSize:21,height:30}}
    labelFontSize={20}
    containerStyle={styles.pickerStyle}
    label={'Choose subject'}
    data={this.formatData(this.state.subjects)}
    useNativeDriver={true}
    value={this.state.selectedSubject}
    onChangeText={(v) => {
      this.setState({
        selectedSubject: v
      })
    }}
    />} 
  <Text style={{
      marginTop:20,
      marginBottom:15,
      fontSize:25,
    fontWeight:'bold',
    textAlign:'center',

  }}>Select Dates</Text>
    <DateRangePicker
      onChange={(v) => {
        this.setState({
          ...v
        })
      }}
      endDate={this.state.endDate}
      startDate={this.state.startDate}
      displayedDate={this.state.displayedDate}
      range
      >
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        alignItems: "center"
      }}>
      <FontAwesome name="calendar" size={27} color={"blue"} />
      {this.state.startDate != undefined && this.state.endDate != undefined ?
      <Text style={{
        marginLeft: 16,
        fontSize: 20
      }}>{this.state.startDate.format("DD-MM-YYYY")} - {this.state.endDate.format("DD-MM-YYYY")}</Text>
      : null }
      </View>
  </DateRangePicker>
    
    <Text style={{
        marginTop:50,
        fontSize:25,
      fontWeight:'bold',
      textAlign:'center',

    }}>Enter Percentage</Text>
    <TextInput style={styles.inputbox} 
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter percentage here"
      placeholderTextColor= "#ffffff"
      selectionColor="#fff"
      keyboardType="number-pad"
      textContentType={"telephoneNumber"}
      value={`${this.state.percentage}`}
      onChangeText={percentage=>this.setState({percentage: percentage})}
    />
    
   <TouchableOpacity style={styles.button} onPress= {() => Actions.getattendance({
       startDate: this.state.startDate,
       endDate: this.state.endDate,
       subject: this.state.selectedSubject,
       batch: this.state.sselectedBatch,
       percentage: this.state.percentage
   })} 
   
   >
     <Text style={styles.buttontext}>
        Submit
      </Text>
    </TouchableOpacity>
    </ImageBackground>
    </View>
  </View>
) 
  }
  
}
const styles = StyleSheet.create({
  maincontainer:{
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    alignItems: 'center',
      
  },
  button:{
    width:250,
    backgroundColor: "#555b5f",
    borderRadius:25,
    marginVertical:20,
    paddingVertical:12,
    marginHorizontal:25,
    alignItems: 'center',
},buttontext:{
  fontSize:23,
  fontWeight:'bold',
  color:'#ffffff',
  textAlign:'center',
},
inputbox:{
  width:300,
  height:50,
  backgroundColor: '#bfbfbf',
  borderRadius:25,
  fontWeight:'500',
  paddingHorizontal:110,
  fontSize:22,
  color:"#000000",
  marginVertical:10,
  
},
backgroundimage:{
  flex:1,
  width: '130%',
  height: '100%',
  opacity: 0.9,
  paddingHorizontal:30,
},


});