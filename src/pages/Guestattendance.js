import React from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { ScrollView } from "react-native-gesture-handler";
import { db } from '../utils/Firebase';


export default class GuestAttendance extends React.Component {

    constructor(props){
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
                batch: null
            },
            max: 0,
            attendance: []
        }
    }
}