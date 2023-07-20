import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';
import axios from 'axios';
import { IP_ADDRESS } from '@env';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const Attendance: React.FC = () => {


  // Mock data
  // const attendanceData: MarkedDates = {
  //   '2023-06-10': { customStyles: { container: { backgroundColor: 'green', borderRadius: 12 }, text: { color: '#ffffff' } } },
  //   '2023-06-12': { customStyles: { container: { backgroundColor: 'red', borderRadius: 12 }, text: { color: '#ffffff' } } },
  //   '2023-06-14': { customStyles: { container: { backgroundColor: 'orange', borderRadius: 12 }, text: { color: '#ffffff' } } },
  //   '2023-06-16': { customStyles: { container: { backgroundColor: 'blue', borderRadius: 12 }, text: { color: '#ffffff' } } },
  //   // Add more dates here with their respective custom styles
  // };

  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceCodes, setAttendanceCodes] = useState({}); // initialize as empty object
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarKey, setCalendarKey] = useState(Date.now().toString()); // Add this state for the key prop
  const [currentMonth, setCurrentMonth] = useState('');

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    Alert.alert(attendanceData[day.dateString]?.title || 'No information for this date');
  };

  useEffect(() => {
    // Replace with your own API URL
    console.log("useeffect")
    const fetchDates = async () => {
      console.log("fetch dates")
      const response = await axios.get(
        'http://' + IP_ADDRESS + ':8080/attendance?username=' + username + '&password=' + password
      );
      console.log(response)
          if (response.data) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthNumber = monthNames.indexOf(response.data.monthNow.split(" ")[0]) + 1; // Months are 0 indexed
            const monthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
            const year = response.data.monthNow.split(" ")[1]; // Extract year from 'monthNow'
            setCurrentMonth(year + '-' + monthString + '-01');
            const newData: MarkedDates = {};
            response.data.data.forEach(item => {
              const dateString = `${year}-${monthString}-${item.day.length == 1 ? "0" + item.day : item.day}`;  // modify this to match your data structure
              const attendances = item.attendance.split('\n');
              const attendance = item.attendance;
              const BGcolor = item.color;
              let realBGcolor;
              if(BGcolor.indexOf("#")!=-1){
                realBGcolor = BGcolor.substring(BGcolor.indexOf("#"), BGcolor.indexOf("#") + 7);
              } else {
                realBGcolor = "";
              }
              newData[dateString] = {
                title: attendance,
                customStyles: {
                  container: {
                    backgroundColor:  realBGcolor != "#CCCCCC" ? realBGcolor : "transparent",
                    borderRadius: 12
                  },
                  text: {
                    color: theme == "dark" ? "#ffffff" : "#000000"
                  }
                }
              };
            });
            setAttendanceData(newData);
          }
        
    }
    fetchDates();
  }, []);

  const renderDay = (day: any, item: any) => {
    if (item && item.customStyles) {
      const { backgroundColor, color } = item.customStyles.container;
      return (
        <View style={styles.AttendanceDayContainer}>
          <View style={[styles.AttendanceEmptyBox, { backgroundColor }]} />
          <Text style={[styles.AttendanceDayText, { color }]}>{day.day}</Text>
        </View>
      );
    }
    return (
      <View style={styles.AttendanceDayContainer}>
        <Text style={styles.AttendanceDayText}>{day.day}</Text>
      </View>
    );
  };

  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    // Update the key whenever the theme changes
    setCalendarKey(Date.now().toString());
  }, [theme]);
  const styles = theme == 'light' ? lightStyles : darkStyles;
  const lightTheme = {
    backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#000000',
            selectedDayBackgroundColor: '#e8e8e8',
            selectedDayTextColor: '#000000',
            todayTextColor: '#000000',
            dayTextColor: '#000000',
            textDisabledColor: '#cccccc',
            dotColor: 'transparent',
            selectedDotColor: 'rgba(0, 0, 0, 0)',
            arrowColor: 'black',
            monthTextColor: '#000000',
            indicatorColor: '#000000',
            textDayFontFamily: 'Avenir',
            textMonthFontFamily: 'Avenir',
            textDayHeaderFontFamily: 'Avenir',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13,
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
  }
  const darkTheme = {
    backgroundColor: '#222',
    calendarBackground: '#222',
    textSectionTitleColor: '#ffffff',
    selectedDayBackgroundColor: '#e8e8e8',
    selectedDayTextColor: '#000000',
    todayTextColor: '#1da4f2',
    dayTextColor: '#fff',
    textDisabledColor: '#444',
    dotColor: '#0089d9',
    selectedDotColor: '#0089d9',
    arrowColor: 'white',
    monthTextColor: '#ffffff',
    indicatorColor: '#ffffff',
    textDayFontFamily: 'Avenir',
    textMonthFontFamily: 'Avenir',
    textDayHeaderFontFamily: 'Avenir',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 13,
    textDayFontWeight: 'bold',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',
  };
  return (
    <View style={styles.AttendanceContainer}>
      <ScrollView>
      <View style={styles.AttendanceCalendarContainer}>
        <Calendar
          key={calendarKey}
          markingType='custom'
          onDayPress={onDayPress}
          markedDates={attendanceData}
          theme={theme == 'light' ? lightTheme : darkTheme}
          renderDay={renderDay}
          enableSwipeMonths={true}
          current = {currentMonth}
        />
      </View>
      <View style={styles.AttendanceLegendContainer}>
        <View style={styles.AttendanceLegendBox}>
          <Text style={styles.AttendanceLegendTitle}>Color Legend</Text>
          {Object.entries(attendanceCodes).map(([code, data]) => (
            <View key={code} style={styles.AttendanceLegendItem}>
              <View style={[styles.AttendanceLegendColorBox, { backgroundColor: data.color }]} />
              <Text style={styles.AttendanceLegendText}>{data.label}</Text>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};
export default Attendance;
