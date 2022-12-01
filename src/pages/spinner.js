import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default class Spinner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
    alignSelf: "center",
  },
});
