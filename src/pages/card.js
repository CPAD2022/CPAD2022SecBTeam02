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