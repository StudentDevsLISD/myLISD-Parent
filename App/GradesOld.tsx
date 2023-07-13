import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GradesType = Record<string, number>;

interface GradeType {
  color: string;
  letter: string;
}

type RootStackParamList = {
  Home: undefined;
  NewsScreen: undefined;
  ContactTeachers: undefined;
  BusTracking: undefined;
  GoogleFeedback: undefined;
  ContactUs: undefined;
  VirtualAssistant: undefined;
  QuickLinks: undefined
  Details: { id: number };
  WebViewScreen: { url: string };
  AssignmentScreen: {data: undefined};
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
}

const getGrade = (score: number): GradeType => {
  if (score >= 90.00) return { color: '#00DE64', letter: 'A' };
  if (score >= 80.00) return { color: '#3199FE', letter: 'B' };
  if (score >= 70.00) return { color: '#F99816', letter: 'C' };
  return { color: '#FB5B5B', letter: 'D' };
};

const Grades = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchGrades = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/?username=${username}&password=${password}`)
      const currentClasses = response.data.currentClasses;
      setClasses(currentClasses);
      console.log(currentClasses);

      const grades = {};
      for (let classObj of currentClasses) {
        if (classObj.grade !== '') {
          grades[classObj.name] = parseFloat(classObj.grade.split(' ')[2]).toFixed(2);
        } else {
          grades[classObj.name] = "0.00";
        }
      }
      console.log(grades);

      setGrades(grades);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      setIsLoggedIn(true);
      fetchGrades();
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const loadCredentials = async () => {
    try {
      const loadedUsername = await AsyncStorage.getItem('username');
      const loadedPassword = await AsyncStorage.getItem('password');

      if (loadedUsername !== null && loadedPassword !== null) {
        setUsername(loadedUsername);
        setPassword(loadedPassword);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
    loadCredentials();
  }, []);

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

  const [grades, setGrades] = useState<Record<string, string>>({});

  return (
    <View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.headerText}>Grades</Text>
        </View>
        {!isLoggedIn && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Username'
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity style={styles.loginButton} onPress={saveCredentials}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        {Object.entries(grades).map(([subject, grade], index) => {
          const { color, letter } = getGrade(Number(grade));
          return (
            <TouchableOpacity style={styles.gradeContainer} key={index} onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: "AssignmentScreen",
                  params: { data: {
                    course: classes[index].name,
                    grade:  grades[classes[index].name],
                    assignments: classes[index].assignments,
                  }}
                })
              );
            }}>
              <View style={styles.gradeItem}>
                <View style={styles.gradientTextContainer}>
                  <Text numberOfLines={1} style={styles.gradeText}>{subject.substring(12)}</Text>
                </View>
                <View style={styles.gradeBadge}>
                  <Text style={styles.gradeBadgeText2}>{letter}</Text>
                </View>
                <View style={[styles.gradeBadgeColor, { backgroundColor: color }]}>
                  <Text style={styles.gradeBadgeText}>{grade}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

  
  const styles = StyleSheet.create({
    gradeContainer: {
      backgroundColor: '#E6E6E6',
      borderRadius: 10,
      padding: 12.5,
      marginVertical: 5,
      marginHorizontal: 10,
    },
    gradeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: -3,
    },
    gradeText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    gradeBadge: {
      borderRadius: 8,
      paddingHorizontal: 11,
      paddingVertical: 5,
      marginLeft: 10,
    },
    gradeBadgeColor: {
      borderRadius: 8,
      paddingHorizontal: 11,
      paddingVertical: 8,
    },
    gradeBadgeText: {
  
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    gradeBadgeText2: {
  
      color: '#e8e8e8',
      fontSize: 0,
      fontWeight: 'bold',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 5,
    },
    headerText: {
      fontSize: 40,
      marginLeft: -95,
      marginBottom: 10,
      marginTop: 10,
      color: "#005987",
      fontWeight: "600",
    },  gradientTextContainer: {
      flexDirection: 'row',
      maxWidth: '60%',
      position: 'relative',
    },
  
    gradientOverlay: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '30%',
      height: '100%',
    },
  
    dateText: {
      fontSize: 14,
      color: 'gray',
      marginTop: 58,
      marginLeft: 14,
    },
    inputContainer: {
      padding: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    loginButton: {
      backgroundColor: '#3199FE',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  
  export default Grades;
  