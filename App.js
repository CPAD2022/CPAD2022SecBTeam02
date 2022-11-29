import React, { Component } from 'react';
import { StyleSheet, View , StatusBar, LogBox } from 'react-native';
import Navig from './src/navig';
import Firebase from './src/utils/Firebase';




export default class App extends Component {

  

  componentDidMount(){
    LogBox.ignoreLogs(['Warning: Each', 'Warning: Failed'])
    LogBox.ignoreAllLogs(true)
  }

  render(){
  return (
    <View style={styles.container}>
      
      <Navig/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
});
