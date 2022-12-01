import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image,ImageBackground} from 'react-native';

export default class First extends Component {
    teacherlogin()
    {
        Actions.teacherlogin()
    }
    studentlogin()
    {
        Actions.studentlogin()
    }
    guestlogin()
    {
        Actions.guestlogin()
    }
    render(){
        return(
            <View style={styles.maincontainer}>
            <View >
                <ImageBackground 
                style={styles.backgroundimage}
                source={require('../images/pic.jpg')}>
                    <Text style={styles.BITS}>
                    Birla Institute of Technology & Science
                    </Text>
                    <Text style={styles.BITS}>
                    Pilani  
                    </Text>
                <TouchableOpacity style={styles.button} >
                    <Image
                        style={styles.imagestyle}
                        source={require('../images/teacher.png')}
                    />
                    <View style={styles.SeparatorLine}/>
                    <TouchableOpacity onPress={this.teacherlogin}>
                        <Text style={styles.buttontext}>
                            Teachers
                        </Text>
                    </TouchableOpacity>
                   
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} >
                    <Image
                        style={styles.imagestyle}
                        source={require('../images/student2.jpg')}
                    />
                    <View style={styles.SeparatorLine}/>
                    <TouchableOpacity onPress={this.studentlogin}>
                        <Text style={styles.buttontext}>
                            Students
                        </Text>
                    </TouchableOpacity>
               
                </TouchableOpacity>
                   <TouchableOpacity style={styles.button} >
                    <Image
                        style={styles.imagestyle}
                        source={require('../images/guest.png')}
                    />
                    <View style={styles.SeparatorLine}/>
                    <TouchableOpacity onPress={this.guestlogin}>
                        <Text style={styles.buttontext}>
                            Guest
                        </Text>
                    </TouchableOpacity>
                   </TouchableOpacity>
                   </ImageBackground>
            </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    },
    backgroundimage:{
        flex: 1,
        width: '150%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.75,
        
    },
    imagestyle:{
        width: 100, 
        height: 100, 
        borderRadius: 100/2, 
        borderColor:'black', 
        borderWidth:1.5,
        transform:[{scale: 0.65 }]
    },
    button:{
        flexDirection:'row',
        alignItems: 'center',
        width:300,
        height: 90,
        margin:10,
    },
    buttontext:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        marginBottom : 5,
        paddingHorizontal:20,
    },
    BITS:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
        marginBottom : 15,
        paddingHorizontal:20,  
    },
    SeparatorLine :{
        backgroundColor : 'grey',
        width: 2,
        height: 40 
        }
});