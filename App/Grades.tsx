import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

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

  const formatGradeValue = (gradeValue) => {
    if (gradeValue < 100) {
      // Keep up to 2 decimal places
      return gradeValue.toFixed(2);
    } else {
      // Format as "x.x" with one decimal place
      return gradeValue.toFixed(1);
    }
  };
  

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
      // console.log(isLoading);
const grades = {};
for (let classObj of currentClasses) {
  if (classObj.grade !== '') {
    let gradeValue = parseFloat(classObj.grade.split(' ')[2]);
    grades[classObj.name] = formatGradeValue(gradeValue);
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
    // console.log(isLoading);
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


  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;


  return (
    <View style={styles.GradesContainer}>
    {isLoading ? (
       <ActivityIndicator animating={true} size={'large'} color={'#005a87'}/>

      ) : (
        
          <><View style={styles.GradesHeader}>
            <Text style={styles.GradesDateText}>{currentDate}</Text>
            <Text style={styles.GradesHeaderText}>Grades</Text>
          </View><ScrollView>
              {!isLoggedIn && (
                <View style={styles.GradesInputContainer}>
                  <TextInput
                    style={styles.GradesInput}
                    placeholder='Username'
                    onChangeText={setUsername}
                    value={username} />
                  <TextInput
                    style={styles.GradesInput}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password} />
                  <TouchableOpacity style={styles.GradesLoginButton} onPress={saveCredentials}>
                    <Text style={styles.GradesLoginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showNoNewGrades && (
                <TouchableOpacity disabled={true} style={styles.GradesAppButtonContainer2}>
                  <Text style={styles.GradesAppButtonText2}>
                    {'No New Grades Have Been Added'}
                  </Text>
                </TouchableOpacity>
              )}
              {Object.entries(grades).map(([subject, grade], index) => {
                const { color, letter } = getGrade(Number(grade));
                return (
                  <TouchableOpacity style={styles.GradesGradeContainer} key={index} onPress={() => {
                    // console.log(classes);
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
                  } }>
                    <View style={styles.GradesGradeItem}>
                      <View style={styles.GradesGradientTextContainer}>
                        <Text numberOfLines={1} style={styles.GradesGradeText}>{subject.substring(12)}</Text>
                      </View>
                      <View style={styles.GradesGradeBadge}>
                        <Text style={styles.GradesGradeBadgeText2}>{letter}</Text>
                      </View>
                      <View style={[styles.GradesGradeBadgeColor, { backgroundColor: color }]}>
                        <Text style={styles.GradesGradeBadgeText}>{grade}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView></>
      )}
    </View>
  );
};


  export default Grades;
  