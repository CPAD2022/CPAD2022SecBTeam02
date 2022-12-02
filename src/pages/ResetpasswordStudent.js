import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground, Alert} from 'react-native';
import firebase from 'firebase';
import Logo from '../components/logo';
import {Actions} from 'react-native-router-flux';

export default class StudentResetPassword extends Component {
    state={
        email:'',
        oldPassword: '',
        password:'',
        error:'',
    };
    onBottonPress(){
        this.setState({error:''});
        const db = firebase.firestore()
        db.collection('student').where("email", '==',`${this.state.email}`.toLowerCase()).where("password", '==', this.state.oldPassword).get().then(snapshot =>{
            if(snapshot.docs.length > 0 ){
                const student = snapshot.docs[0].id
                db.collection('student').doc(student).update({
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