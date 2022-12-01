import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Teacherlogin from './pages/teacherlogin';
import Studentlogin from './pages/studentlogin';
import Guestlogin from './pages/guestlogin';
import First from './pages/first';
import Teacherhomepage from './pages/teacherhomepage';
import Addbatch from './pages/addbatch';
import Addattendance from './pages/Addattendance';
import StackAttendance from './pages/StackAttendance';
import Studenthomepage from './pages/studenthomepage';
import Guesthomepage from './pages/guesthomepage';
import CheckAttendaneDateWise from './pages/CheckAttendaneDateWise';
import GetAttendance from './pages/GetAttendance';
import SelectInternals from './pages/SelectInternals';
import StackInternals from './pages/StackInternals';
import SelectInternalsForMarks from './pages/SelectInternalsForMarks';
import GetMarks from './pages/GetMarks';
import StudentAttendance from './pages/studentAttendance';
import StudentInternals from './pages/StudentInternals';
import GuestInternals from './pages/GuestInternals';
import GuestAttendance from './pages/guestAttendance';
import GuestResetPassword from './pages/ResetPassword';
import StudentResetPassword from './pages/ResetPasswordStudent';
import TeacherResetPassword from './pages/ResetPasswordTeacher';
import StudentAnalytics from './pages/StudentAnalytics';
import TeacherAnalytics from './pages/TeacherAnalytics';
import AddStudent from './pages/addstudent';
import Add_attend from './pages/add_attend';

export default class Navig extends Component{
    render()
    {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                <Scene key="first" component={First} title="First" initial={true} />
                <Scene key="teacherlogin" component={Teacherlogin} title="Teacher Login" />
                <Scene key="studentlogin" component={Studentlogin} title="Student Login" />
                <Scene key="guestlogin" component={Guestlogin} title="Guest login" />
                <Scene key="teacherhomepage" component={Teacherhomepage} title="Teacher homepage"  />
                <Scene key="addbatch" component={Addbatch} title="addbatch"  />
                <Scene key="addattendance" component={Addattendance} title="Addattendance" />
                <Scene key="stackattendance" component={StackAttendance} title="Stack Attendance"  />
                <Scene key="studenthomepage" component={Studenthomepage} title="Studenthomepage" />
                <Scene key="guesthomepage" component={Guesthomepage} title="Guesthomepage" />
                <Scene key="checkattendancedatewise" component={CheckAttendaneDateWise} title="Check Attendance"/>
                <Scene key="getattendance" component={GetAttendance} title="Get Attendance" />
                <Scene key="studentattendance" component={StudentAttendance} title="Student Attendance" />
                <Scene key="studentinternals" component={StudentInternals} title="Student Internals" />
                <Scene key="guestattendance" component={GuestAttendance} title="Guest Attendance" />
                <Scene key="guestinternals" component={GuestInternals} title="Guest Internals" />
                <Scene key="guestreset" component={GuestResetPassword} title="Guest Reset Password" />
                <Scene key="studentreset" component={StudentResetPassword} title="Student Reset Password" />
                <Scene key="teacherreset" component={TeacherResetPassword} title="Teacher Reset Password" />
                <Scene key="selectinternals" component={SelectInternals} title="Select Internals"  />
                <Scene key="stackinternals" component={StackInternals} title="Stack Internals" />
                <Scene key="selectinternalsformarks" component={SelectInternalsForMarks} title="Select Internals For Marks"  />
                <Scene key="getmarks" component={GetMarks} title="Get Marks" />
                <Scene key="studentanalytics" component={StudentAnalytics} title="Student Analytics" />
                <Scene key="teacheranalytics" component={TeacherAnalytics} title="Teacher Analytics" />
                <Scene key="addstudent" component={AddStudent} title="Student internal analytics " />
                <Scene key="add_attend" component={Add_attend} title="Student attendance " />
                </Stack>
             </Router> 
        );
    }
}