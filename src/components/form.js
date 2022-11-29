import React, {Component} from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View , TextInput, TouchableOpacity} from 'react-native';

export default class Form extends Component {
    state={
        Email:'',
        password:'',
        error:'',
    };
    onBottonPress(){
        const {Email,password}=this.state;
        this.setState({error:''});
        firebase.auth().signInWithEmailAndPassword(Email,password)
            .then(this.onloginSuccess.bind(this))
          .catch(()=>{
            this.setState({error:'Login Failed'});
          });
    }
    onloginSuccess(){
        this.setState({
            Email:'',
            password:'',
            error:'',
        });
    }
    
    render(){

        return(
            <View style={styles.container}>
               <TextInput style={styles.inputbox} 
                 underlineColorAndroid='rgba(0,0,0,0)'
                 placeholder="Email"
                 placeholderTextColor= "#ffffff"
                 selectionColor="#fff"
                 keyboardType="email-address"
                 value={this.state.Email}
                 onChangeText={Email=>this.setState({Email})}
                 onSubmitEditing={()=>this.password.focus()}
               />
               <TextInput style={styles.inputbox} 
                 underlineColorAndroid='rgba(0,0,0,0)'
                 placeholder="Password"
                 secureTextEntry={true}
                 placeholderTextColor= "#ffffff"
                 value={this.state.password}
                 onChangeText={password=>this.setState({password})}
                 ref={(input)=>this.password=input}
               />
               <Text style={styles.loginerror}>
                   {this.state.error}
               </Text>
               <TouchableOpacity style={styles.button} onPress={this.onBottonPress.bind(this)}>
                   <Text style={styles.buttontext}>
                       Login
                   </Text>
               </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      alignItems:'center',
      justifyContent:"flex-start"
    },
    inputbox:{
        width:300,
        height:50,
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
    loginerror:{
        fontSize:16,
        fontWeight:'500',
        color:'red',
        textAlign:'center',
    },
    buttontext:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    }
  });