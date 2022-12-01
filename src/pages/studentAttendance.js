import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../utils/Firebase";

export default class StudentAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      summary: {},
      isLoading: true,
      subjects: [],
      student: {
        id: null,
        name: null,
        usn: null,
        batch: null,
      },
      max: 0,
      attendance: [],
    };
  }

  async getAttendance() {
    const batchReference = db.collection("batch").doc(this.state.student.batch);
    const subjects = await db
      .collection("subject")
      .where("batch", "==", batchReference)
      .get();
    const student = await db
      .collection("student")
      .doc(this.state.student.id)
      .get();
    for (let i = 0; i < subjects.docs.length; i++) {
      let v = subjects.docs[i];
      const attendanceRef = await db
        .collection("attendance")
        .where("subject", "==", v.ref)
        .where("student", "==", student.ref)
        .get();
      const attendance = attendanceRef.docs;
      let total = attendance.length;
      let present = attendance.filter((v) => v.get("status")).length;
      this.state.attendance.push({
        id: v.id,
        name: v.get("name"),
        total: total,
        present: present,
        percentage: `${((present / (total > 0 ? total : 1)) * 100).toFixed(
          2
        )}%`,
      });
    }
  }

  componentDidMount() {
    db.collection("student")
      .doc(this.props.student)
      .get()
      .then((s) => {
        this.setState({
          student: {
            id: s.id,
            name: s.get("name"),
            usn: s.get("usn"),
            batch: s.get("batch").id,
          },
        });
        this.getAttendance().then(() => {
          this.setState({
            isLoading: false,
          });
        });
      });
  }

  render() {
    return (
      <View style={styles.check}>
        <ScrollView>
          {!this.state.isLoading ? (
            this.state.attendance.map((v) => {
              return (
                <Card style={styles.card}>
                  <Text style={styles.text}>Subject: {v.name}</Text>
                  <Text style={styles.text}>
                    Attendance: {v.present} / {v.total}
                  </Text>
                  <Text style={styles.text}>Percentage: {v.percentage}</Text>
                </Card>
              );
            })
          ) : (
            <ActivityIndicator
              size="large"
              color="#1273de"
              style={styles.activityindicator}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityindicator: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
  },
  check: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 240,
    marginTop: 50,
    height: 250,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4463a",
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
});