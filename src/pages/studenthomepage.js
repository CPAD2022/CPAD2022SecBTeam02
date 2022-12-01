import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Alert,
  ToastAndroid,
} from "react-native";

export default class Studenthomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
    };
  }

  componentDidMount() {
    this.setState({
      student: this.props.student,
    });
  }

  takeattendancepage() {
    Actions.addbatch();
  }
  studentreset() {
    Actions.studentreset();
  }
  logout() {
    Alert.alert("Log out", "You have logged out sucessfully");
    Actions.popTo("first", { refresh: true });
  }
  render() {
    return (
      <View style={styles.maincontainer}>
        <View>
          <ImageBackground
            style={styles.backgroundimage}
            source={require("../images/pic.jpg")}
          >
            <TouchableOpacity style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  Actions.studentattendance({
                    student: this.state.student,
                  })
                }
              >
                <Text style={styles.buttontext}>Check Attendance</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  Actions.studentinternals({
                    student: this.state.student,
                  })
                }
              >
                <Text style={styles.buttontext}>Check Marks</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  Actions.studentanalytics({
                    student: this.state.student,
                  })
                }
              >
                <Text style={styles.buttontext}>Analytics</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <TouchableOpacity onPress={this.studentreset}>
                <Text style={styles.buttontext}>Change Password</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <TouchableOpacity onPress={this.logout}>
                <Text style={styles.buttontext}>Logout</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#899097",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: 270,
    backgroundColor: "#44584e",
    borderWidth: 0.5,
    borderRadius: 30,
    height: 70,
    margin: 7,
  },
  buttontext: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    marginBottom: 4,
    paddingHorizontal: 35,
  },
  backgroundimage: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.95,
    paddingHorizontal: 40,
  },
});
