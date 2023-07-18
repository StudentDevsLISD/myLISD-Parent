import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

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
  const attendanceCodes = {
    'Present': {
      color: 'green',
      label: 'Present',
    },
    'Absent': {
      color: 'red',
      label: 'Absent',
    },
    'Late': {
      color: 'orange',
      label: 'Late',
    },
    'Excused': {
      color: 'blue',
      label: 'Excused',
    },
  };

  // Mock data
  const attendanceData: MarkedDates = {
    '2023-06-10': { customStyles: { container: { backgroundColor: 'green', borderRadius: 12 }, text: { color: '#ffffff' } } },
    '2023-06-12': { customStyles: { container: { backgroundColor: 'red', borderRadius: 12 }, text: { color: '#ffffff' } } },
    '2023-06-14': { customStyles: { container: { backgroundColor: 'orange', borderRadius: 12 }, text: { color: '#ffffff' } } },
    '2023-06-16': { customStyles: { container: { backgroundColor: 'blue', borderRadius: 12 }, text: { color: '#ffffff' } } },
    // Add more dates here with their respective custom styles
  };

  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

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
  const styles = theme === 'light' ? lightStyles : darkStyles;

  
  return (
    <View style={styles.AttendanceContainer}>
      <View style={styles.AttendanceCalendarContainer}>
        <Calendar
          markingType='custom'
          onDayPress={onDayPress}
          markedDates={attendanceData}
          theme={{
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
          }}
          renderDay={renderDay}
          enableSwipeMonths={true}
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
    </View>
  );
};
export default Attendance;
