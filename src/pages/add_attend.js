import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity,Text, Dimensions,  Picker, ActivityIndicator,ImageBackground,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { db } from '../utils/Firebase';
import { Dropdown } from 'react-native-material-dropdown';
const width = Dimensions.get('window').width

export default class Add_attend extends Component {

  constructor(props){
    super(props);
    this.state = {
      batches: [],
      selectedBatch:"",
      subjects: [],
      selectedSubject: "",
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
          isLoading: false
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
  <View style={styles.maincontainer} >
    <View >
      <ImageBackground 
          style={styles.backgroundimage}
          source={require('../images/pic.jpg')}>
      <Text style={{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        paddingVertical:130,
        }}>
        Select batch
      </Text>

    {this.state.isLoading ? <ActivityIndicator size="large" color="#1273de" /> : 
    <Dropdown
    containerStyle={styles.pickerStyle}
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
    />
   
    }
    {this.state.isLoading && this.state.selectedBatch.length == 0 ? <ActivityIndicator size="small" color="#1273de" /> : 
    <Dropdown
    containerStyle={styles.pickerStyle}
    style={{fontSize:21,height:30}}
    labelFontSize={20}
    label={'Choose subject'}
    data={this.formatData(this.state.subjects)}
    useNativeDriver={true}
    value={this.state.selectedSubject}
    onChangeText={(v) => {
      this.setState({
        selectedSubject: v
      })
    }}
    />
   
    }
    
   
   <TouchableOpacity  style={styles.button} 
      onPress={() => Actions.stackattendance({batch: this.state.selectedBatch, subject: this.state.selectedSubject})}>
      <Text style={styles.buttontext}>
        Submit
      </Text>
    </TouchableOpacity>
    </ImageBackground>
    </View>
  </View>
  ) }}

const styles = StyleSheet.create({
  maincontainer:{
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    alignItems: 'center',
  },
  button:{
    textAlign: "center",
    backgroundColor: "#202824",
    borderRadius:25,
    marginVertical:110,
    paddingVertical:15,
},
buttontext:{
  fontSize:25,
  fontWeight:'bold',
  color:'#ffffff',
  textAlign:'center',
    
},
backgroundimage:{
  flex:1,
  height: '100%',
  width: '130%',
  opacity: 0.9,
  paddingHorizontal: 60
},
pickerStyle:{ 
  color: 'red',
  marginTop: 24,
  width: width * 0.8,
  alignSelf: "stretch",
  justifyContent:'center',
 
}  

});