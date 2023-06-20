import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars'; // assuming you have this library

const Attendance: React.FC = () => {
  const navigation = useNavigation();
  
  const attendanceCodes = {
    'Present': 'green',
    'Absent': 'red',
    'Late': 'orange',
    'Excused': 'blue',
  }

  // Mock data
  const attendanceData = {
    '2023-06-10': 'Present',
    '2023-06-12': 'Absent',
    '2023-06-14': 'Late',
    '2023-06-16': 'Excused',
    // add more dates here
  };

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  // Transform attendanceData into a suitable format for markedDates
  const markedDates = Object.entries(attendanceData).reduce((accumulator, [date, status]) => {
    accumulator[date] = {
      selected: date === selectedDate,
      marked: true,
      customStyles: {
        container: {
          backgroundColor: attendanceCodes[status],
          borderRadius: 10,
        },
      },
    };
    return accumulator;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar 
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            textDayFontFamily: 'Avenir', // Assuming you've got a font like Avenir installed
            textMonthFontFamily: 'Avenir',
            textDayHeaderFontFamily: 'Avenir',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            selectedDayBackgroundColor: 'blue',
            todayTextColor: 'blue',
          }}
        />
      </View>
      <ScrollView style={styles.legendContainer}>
        {Object.entries(attendanceCodes).map(([code, color]) => (
          <View style={styles.legendItem} key={code}>
            <View style={[styles.colorBox, {backgroundColor: color}]} />
            <Text style={styles.legendText}>{code}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f7', // Like Apple's background color
  },
  calendarContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden', // This is needed to make the child's corners rounded
  },
  legendContainer: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorBox: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 16,
    fontFamily: 'Avenir',
  }
});

export default Attendance;
