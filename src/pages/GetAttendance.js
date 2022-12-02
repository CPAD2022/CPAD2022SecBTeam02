import React from 'react';
import { Text, View, Button, ScrollView , ActivityIndicator,StyleSheet} from 'react-native';
import { db } from '../utils/Firebase';
import moment from 'moment-timezone'
import StudentCard from '../components/StudentCard';
import { cos } from 'react-native-reanimated';
moment.tz.setDefault("Asia/Kolkata")



export default class GetAttendance extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            students: [],
            summary: {},
            max: 0,
            filteredStudents: [],
            isLoading:true,
        }
    }

    formatDates = (startDate, endDate) => {
        let newStartDate = new Date(startDate)
        newStartDate.setHours(0, 0, 0, 0)
        let newEndingDate = new Date(endDate)
        newEndingDate.setHours(23, 59, 59, 9999)
        return {
            startDate: new Date(newStartDate),     
            endDate: new Date(newEndingDate)
        }
        
    }
}