import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/logo';
import {Actions} from 'react-native-router-flux';


export default class Signup extends Component {
    goBack(){
        Actions.pop();
    }
    
    render(){
        
        return (
            <View style={styles.container}> 
                <Logo />
                <TextInput style={styles.inputbox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Username'
                placeholderTextColor= "#ffffff"
                selectionColor="#fff"
                autoCapitalize="none"
                />
                <TextInput style={styles.inputbox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Department'
                placeholderTextColor= "#ffffff"
                selectionColor="#fff"
                autoCapitalize="none"
                />
                
                <TextInput style={styles.inputbox}
                placeholder='Phone Number'
                autoCapitalize="none"
                placeholderTextColor= "#ffffff"
                />
                <TextInput style={styles.inputbox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor= "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=>this.password.focus()}
                />
                <TextInput style={styles.inputbox}
                placeholder='Password'
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor= "#ffffff"
                ref={(input)=>this.password=input}
                />
                <TouchableOpacity style={styles.button}>
                   <Text style={styles.buttontext}>
                       Sign up
                   </Text>
               </TouchableOpacity>

                <View style={styles.signuptext}>
                    <Text style={styles.signup}>
                        Already have an account? 
                    </Text>
                    <TouchableOpacity onPress={this.goBack}>
                         <Text style={styles.signupbutton}>Sign in</Text>
                    </TouchableOpacity>
                    

                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#899097',
      alignItems:'center',
      justifyContent:'center',
    },
    signuptext:{
      flexGrow:1,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      paddingVertical:16,
    },
    signup: {
        fontSize:16,
        color:'rgba(255,255,255,0.7)',
    },
    signupbutton:{
        fontSize:16,
        fontWeight:'500',
    },
    inputbox:{
        width:300,
        height:40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius:25,
        fontWeight:'500',
        paddingHorizontal:20,
        fontSize:18,
        color:"#ffffff",
        marginVertical:10,
    },
   
    button:{
        width:300,
        backgroundColor: "#555b5f",
        borderRadius:25,
        marginVertical:10,
        paddingVertical:12,
    },
    buttontext:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    }
  });