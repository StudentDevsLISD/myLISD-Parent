import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

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
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [showNoNewGrades, setShowNoNewGrades] = useState(false); // State to control the message display
  const route = useRoute();


  const fetchGrades = async (username: string, password: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/?username=${username}&password=${password}`
      );
      const currentClasses = response.data.currentClasses;

      if (currentClasses.length === 0) {
        Alert.alert('Error', 'Error logging in. Please try again.');
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }
      setClasses(currentClasses);

      setIsLoading(true);
      console.log(isLoading);

      const grades = {};
      for (let classObj of currentClasses) {
        if (classObj.grade !== '') {
          grades[classObj.name] = parseFloat(classObj.grade.split(' ')[2]).toFixed(2);
        } else {
          grades[classObj.name] = "0.00";
        }
      }

      // Get the stored grades from AsyncStorage
      const storedGradesJson = await AsyncStorage.getItem('grades');
      const storedGrades = JSON.parse(storedGradesJson);

      // Compare the fetched grades with the stored grades
      const isGradesEqual = JSON.stringify(grades) === JSON.stringify(storedGrades);

      if (isGradesEqual) {
        // If grades are the same, show a message in console and set a flag to show the message on the screen.
        console.log('No new grades found');
        setShowNoNewGrades(true);
      } else {
        // If grades are different, update the AsyncStorage with the new grades and show a message in console.
        await AsyncStorage.setItem('grades', JSON.stringify(grades));
        console.log('Changes found');
        setShowNoNewGrades(false);
      }

      setGrades(grades);
    } catch (error) {
      console.error('Error fetching grades:', error);
      Alert.alert('Error', 'An error occurred while fetching grades.');
      setIsLoggedIn(false);
    }
    setIsLoading(false);
    console.log(isLoading);
  };

  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('hacusername', username);
      await AsyncStorage.setItem('hacpassword', password);
      setIsLoggedIn(true);
      setIsLoading(true);
      fetchGrades(username, password);
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const loadCredentials = async () => {
    try {
      const loadedUsername = await AsyncStorage.getItem('hacusername');
      const loadedPassword = await AsyncStorage.getItem('hacpassword');

      if (loadedUsername !== null && loadedPassword !== null) {
        setUsername(loadedUsername);
        setPassword(loadedPassword);
        setIsLoggedIn(true); // Update login status
        await fetchGrades(loadedUsername, loadedPassword); // Fetch grades after successfully loading credentials
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading data', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (route.params && route.params.justLoggedOut) {
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      setClasses([]); // Reset classes
      setGrades({}); // Reset grades
      AsyncStorage.removeItem('hacusername');
      AsyncStorage.removeItem('hacpassword');
      // Optionally, you can reset the parameter after you're done with it
      navigation.setParams({ justLoggedOut: undefined });
    }
  }, [route.params]);
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

  useEffect(() => {
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

  return (
    <View style={styles.container}>
    {isLoading ? (
       <ActivityIndicator animating={true} size={'large'} color={'#005a87'}/>

      ) : (
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
          {showNoNewGrades && (
            <TouchableOpacity disabled={true} style={styles.appButtonContainer2}>
              <Text style={styles.appButtonText2}>
                {'No New Grades Have Been Added'}
              </Text>
            </TouchableOpacity>
          )}
          {Object.entries(grades).map(([subject, grade], index) => {
            const { color, letter } = getGrade(Number(grade));
            return (
              <TouchableOpacity style={styles.gradeContainer} key={index} onPress={() => {
                console.log(classes);
                // console.log(grades);
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "AssignmentScreen",
                    params: {
                      data: {
                        course: classes[index].name,
                        grade: grades[classes[index].name],
                        assignments: classes[index].assignments,
                      }
                    }
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
      )}
    </View>
  );
};

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      marginHorizontal: 5,
    },
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
      padding: 20,
      backgroundColor: '#fff',
      marginVertical: 15,
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    input: {
      height: 45,
      borderColor: '#005987',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#F0F0F0',
    },
    loginButton: {
      backgroundColor: '#005987',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    appButtonContainer2: {
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 13,
    marginHorizontal: 2.05,
    marginBottom: 7,
    marginTop: -1,
    width: '99%',
    borderWidth: 2,
    borderColor: '#ebe8e8',
    fontWeight: 'bold',

    
    },
    appButtonText2: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'normal',
    
    },
  });
  
  export default Grades;
  