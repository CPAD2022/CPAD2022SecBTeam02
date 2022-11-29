import React, { Component } from 'react';
import { StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class StudentCard extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textElement}>
                     Name: {this.props.name}
                </Text>
                <Text style={styles.textElement}>
                    Usn: {this.props.usn}
                </Text>
                <Text style={styles.textElement}>
                    Summary: {this.props.summary}
                </Text>
                <Text style={styles.textElement}>
                    Percentage: {this.props.percentage}
                </Text>
                <Text style={styles.textElement}>
                    Percentile: {this.props.percentile}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        marginBottom: 8
    },
    textElement: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 4
    }
});