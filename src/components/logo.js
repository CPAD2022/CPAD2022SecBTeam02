import React, {Component} from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

export default class Logo extends Component {
    render(){

        return(
            <View style={styles.container}>
                <Image 
                    style={{width:155 , height:170}}
                    source={require('../images/Bits_logo.png')}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 0.1,
      alignItems:'center',
      justifyContent:'flex-start',
    },
    
  });