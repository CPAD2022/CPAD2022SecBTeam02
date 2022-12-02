import React, { Component } from 'react';
import { StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class Card extends Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <View >
                
                <Text >
                     Name: {this.props.name}
                </Text>
                <Text >
                    Usn: {this.props.usn}
                </Text>
                <TouchableOpacity style={styles.buttonpresent} >
                    <Text style={styles.buttontext}>
                        Present
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonabsent} >
                    <Text style={styles.buttontext}>
                       Absent
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

    const styles = StyleSheet.create({
        maincontainer:{
            flex: 1,
            justifyContent: 'center',
            backgroundColor:'#899097',
            paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
            
        },
        buttonpresent:{
          width:300,
          backgroundColor: "green",
          borderRadius:25,
          marginVertical:10,
          paddingVertical:10,
          marginHorizontal:25,
      },buttontext:{
        fontSize:20,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
      },
      buttonabsent:{
        width:300,
        backgroundColor: "red",
        borderRadius:25,
        marginVertical:10,
        paddingVertical:10,
        marginHorizontal:23,
    },
    text:{
        fontSize:25,
        fontWeight:'500',
        color:'#ffffff',
        marginHorizontal:25,
        marginVertical:10,
      }
      });

