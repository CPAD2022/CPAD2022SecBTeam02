import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, Platform,ImageBackground,Alert} from 'react-native';

export default class Teacherhomepage extends Component {
    add_attend()
    {
        Actions.add_attend()
    }
    addbatch()
    {
        Actions.addbatch()
    }
    checkattendancedatewise()
    {
        Actions.checkattendancedatewise()
    }
    selectinternals()
    {
        Actions.selectinternals()
    }
    teacherreset()
    {
        Actions.teacherreset()
    }
    logout()
    {   
        Alert.alert("Log out", "You have logged out sucessfully")
        Actions.popTo("first", { refresh: true })
    }
    render(){
        return(
            
            <View style={styles.maincontainer}>
                <View >
                <ImageBackground 
                style={styles.backgroundimage}
                source={require('../images/pic.jpg')}>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <TouchableOpacity  style={styles.button} onPress={this.add_attend}>
                        <Text style={styles.buttontext}>
                            Take
                        </Text>
                        <Text style={styles.text}>
                            Attendance
                        </Text>
                        
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.button} onPress={this.checkattendancedatewise}>
                        <Text style={styles.buttontext}>
                            Check
                        </Text>
                        <Text style={styles.text}>
                            Attendance
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.alternativeLayoutButtonContainer}>
                    <TouchableOpacity
                    style={styles.button} onPress={this.selectinternals}>
                        <Text style={styles.buttontextmarks}>
                            Enter Marks
                        </Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.button} onPress={() => { Actions.selectinternalsformarks() }}>
                        <Text style={styles.buttontextmarks}>
                            Check Marks
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <TouchableOpacity  style={styles.button} onPress={this.addbatch}>
                    <Text style={styles.text1}>
                            Attendance
                        </Text>
                        <Text style={styles.buttontext1}>
                            Analytics
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.button} onPress={() => Actions.addstudent()}>
                    <Text style={styles.text1}>
                            IA
                        </Text>
                        <Text style={styles.buttontext1}>
                            Analysis
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                   
    
                    <TouchableOpacity style={styles.button} onPress={this.teacherreset}>
                        <Text style={styles.buttontext}>
                            Change
                        </Text>
                        <Text style={styles.text}>
                            Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.logout}>
                        <Text style={styles.buttontextstyle}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>

                   
                </ImageBackground>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
        
    },
    button:{
        
        alignItems: 'center',
        width:150,
        backgroundColor: "#fbc4b3",
        borderWidth: 1,
        borderRadius:25,
        height: 115,
        margin:8,
    },
    buttontext1:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        paddingHorizontal:20, 
        marginTop: 2,
        
    },
    buttontext:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        paddingHorizontal:20, 
        marginTop: 20,
        
    },
    backgroundimage:{
        flex: 1,
        width: '150%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9,
        paddingHorizontal:50,    
    },
    alternativeLayoutButtonContainer: {
        margin: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      text1:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        marginTop: 20,
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',

    },
    buttontextstyle:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        paddingHorizontal:23, 
        marginTop: 35,
        
    },
    buttontextmarks:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        paddingHorizontal:35, 
        marginTop: 23,
        
    },
});