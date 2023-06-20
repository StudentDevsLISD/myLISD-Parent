import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

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
    '2023-06-10': { selected: true, marked: true, selectedColor: 'green' },
    '2023-06-12': { selected: true, marked: true, selectedColor: 'red' },
    '2023-06-14': { selected: true, marked: true, selectedColor: 'orange' },
    '2023-06-16': { selected: true, marked: true, selectedColor: 'blue' },
    // add more dates here
  };

  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const renderDay = (day: any, item: any) => {
    if (item) {
      const { color } = attendanceCodes[item.marking];
      return (
        <View style={styles.dayContainer}>
          <View style={[styles.legendColorBox, { backgroundColor: color }]} />
          <Text style={[styles.dayText, { color: '#ffffff' }]}>{day.day}</Text>
        </View>
      );
    }
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayText}>{day.day}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
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
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
          renderDay={renderDay}
          enableSwipeMonths={true}
        />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendBox}>
          <Text style={styles.legendTitle}>Color Legend</Text>
          {Object.entries(attendanceCodes).map(([code, data]) => (
            <View key={code} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: data.color }]} />
              <Text style={styles.legendText}>{data.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f7',
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  legendContainer: {
    marginTop: 16,
  },
  legendBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    fontFamily: 'Avenir',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default Attendance;
