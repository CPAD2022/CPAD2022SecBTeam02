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
    calculatePercentile = (ref, index) => {
        let _percentile = ref.percentage / this.state.max * 100
        let _filtered = this.state.filteredStudents
        _filtered[index]["percentile"] = _percentile
        this.setState({
            filteredStudents: _filtered
        })
    }

    filterBasedOnPercentage = () => {
        let filteredStudents = Object.values(this.state.summary).filter(v => {
            if(v.percentage > this.state.max){
                this.setState({
                    max: v.percentage > 0 ? v.percentage : 1
                })
            }
            return Number.parseFloat(v.percentage || 0) <= Number.parseFloat(this.props.percentage || 0)
        })
        this.setState({
            filteredStudents: filteredStudents
        })
    }
}