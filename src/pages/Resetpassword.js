import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground, Alert} from 'react-native';
import firebase from 'firebase';
import Logo from '../components/logo';
import {Actions} from 'react-native-router-flux';

export default class GuestResetPassword extends Component {
    state={
        email:'',
        oldPassword: '',
        password:'',
        error:'',
    };
    onBottonPress(){
        this.setState({error:''});
        const db = firebase.firestore()
        db.collection('guest').where("email", '==',`${this.state.email}`.toLowerCase()).where("password", '==', this.state.oldPassword).get().then(snapshot =>{
            if(snapshot.docs.length > 0 ){
                const guest = snapshot.docs[0].id
                db.collection('guest').doc(guest).update({
                    password: this.state.password
                }).then(v => {
                    Alert.alert("Password changed", "Password changed successfully")
                }).catch(e => {
                    console.error(e)
                })
            }
            else{
                    this.setState({error:'Invalid credentials'});
                }
            })
            
        }
        render(){
            return (
                <View style={styles.container}> 
                <View >
                <ImageBackground 
                    style={styles.backgroundimage}
                    source={require('../images/pic.jpg')}>
                    <Logo />
                    <Text style={styles.logintext}>Guest, Reset Password  </Text>
                    <TextInput style={styles.inputbox} 
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="Email"
                     placeholderTextColor= "#4b6156"
                     selectionColor="#fff"
                     keyboardType="email-address"
                     value={this.state.email}
                     onChangeText={email=>this.setState({email})}
                     onSubmitEditing={()=>this.password.focus()}
                   />
                   <TextInput style={styles.inputbox} 
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="Old password"
                     secureTextEntry={true}
                     placeholderTextColor= "#4b6156"
                     value={this.state.oldPassword}
                     onChangeText={password=>this.setState({oldPassword: password})}
                     ref={(input)=>this.password=input}
                   />
                   <TextInput style={styles.inputbox} 
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="Password"
                     secureTextEntry={true}
                     placeholderTextColor= "#4b6156"
                     value={this.state.password}
                     onChangeText={password=>this.setState({password: password})}
                     ref={(input)=>this.password=input}
                   />
                   <Text style={styles.loginerror}>
                       {this.state.error}
                   </Text>
                   <TouchableOpacity style={styles.button} onPress={this.onBottonPress.bind(this)}>
                       <Text style={styles.buttontext}>
                           Change Password
                       </Text>
                   </TouchableOpacity>
                   </ImageBackground> 
                </View>
                </View>
            );
    
        }
    }
    const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: '#899097',
          alignItems:'center',
          justifyContent:'flex-start',
        },
        
        logintext: {
            marginVertical:15,
            fontSize:22,
            color: 'black',
            fontWeight:'bold',
        },
        inputbox:{
            width:300,
            height:50,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius:25,
            fontWeight:'500',
            paddingHorizontal:20,
            fontSize:22,
            color:"#000000",
            marginVertical:10,
        },
        button:{
            width:300,
            backgroundColor: "#202824",
            borderRadius:25,
            marginVertical:10,
            paddingVertical:12,
        },
        loginerror:{
            fontSize:18,
            fontWeight:'bold',
            color:'red',
            textAlign:'center',
        },
        buttontext:{
            fontSize:19,
            fontWeight:'500',
            color:'#ffffff',
            textAlign:'center',
        },
        backgroundimage:{
            flex: 1,
            width: '150%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.9,
            paddingHorizontal:30,
            
        }
      });
    

    
      