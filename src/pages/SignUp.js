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
