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

export default class StudentInternals extends React.Component {
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
      internals: [],
    };
  }

  async getInternals() {
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
      let internalsRef = await db
        .collection("internals")
        .where("subject", "==", subjects.docs[i].ref)
        .get();
      let internals = internalsRef.docs;
      for (let j = 0; j < internals.length; j++) {
        let marks = await db
          .collection("marks")
          .where("internal", "==", internals[j].ref)
          .where("student", "==", student.ref)
          .get();
        if (marks.docs.length) {
          this.state.internals.push({
            id: marks.docs[0].id,
            name: subjects.docs[i].get("name"),
            ia: internals[j].get("name"),
            marks: marks.docs[0].get("marks"),
            max: internals[j].get("max"),
          });
        }
      }
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
        this.getInternals().then(() => {
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
            this.state.internals.map((v) => {
              return (
                <Card style={styles.card}>
                  <Text style={styles.text}>Subject: {v.name}</Text>
                  <Text style={styles.text}>Internals: {v.ia}</Text>
                  <Text style={styles.text}>
                    Marks Obtained: {v.marks} / {v.max}
                  </Text>
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
