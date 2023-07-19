import React, { useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { RouteProp } from '@react-navigation/native';
import {ThemeContext} from './ThemeContext';
import LightStyles from './LightStyles';
import DarkStyles from './DarkStyles';


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
  Grades: {};
};

type Props = {
  navigation: RouteProp<RootStackParamList>;
}

const AssignmentScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const [categories, setCategories] = useState([]);
  const [breakdowns, setBreakdowns] = useState([])
  const colors = ["#00ff00", "#ff0000", "#0000ff", "#5ebbe6", "#9de65a", "#e6ae5a"]
  let y = [];
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? LightStyles : DarkStyles;

  // console.log(data);

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
  const grade = data.grade;
  const courseName = data.course.substring(12);
  
  // const assignments = [
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Science Project', subtitle: '02/03/2023', grade: '86.00', maxGrade: '100.00', breakdownColor: '#ff0000' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
  //   // Other assignments...
  // ];
  const assignments = data.assignments;
  React.useEffect(() => {
    // let y = [];
    let updatedBreakdowns = [];
  
    for (let i = 0; i < assignments.length; i++) {
      y.push(assignments[i].category);
    }
    
    y = y.filter(function(item, pos) {
      return y.indexOf(item) === pos;
    });
    
    // Assuming that you have predefined weights and colors, let's create new breakdowns
    // y.forEach((category, index) => {
    //   updatedBreakdowns.push({
    //     label: category, // update this value accordingly
    //     weight: '1.0', // update this value accordingly // update this value accordingly
    //   });
    // });
    // console.log(y);
    setCategories(y);
    setBreakdowns(y); 
    }, [assignments]);// It will only rerun this effect if 'assignments' change
  
    const average = ((num: number) => {
      let sum = 0;
      let total = 0;
      let weight = 0.00;
      for(let i =0; i<assignments.length; i++){
        if(categories[num] == assignments[i].category){
          // console.log(assignments[i])
          
          if(assignments[i].weight == "N/A"){
            // console.log(assignments[i].name + ":" + assignments[i].score)
            // console.log((Number(assignments[i].totalPoints) ? Number(assignments[i].totalPoints) : 0))
           
            weight = 1;
          }  else {
            weight = Number(assignments[i].weight);
          }
          if(assignments[i].score == "X" || assignments[i].isDr.indexOf("strike") != -1){
            weight = 0;
          }
          if(assignments[i].score == "M"){
            assignments[i].score = "0"
          }
          if(assignments[i].score == "N/A"){
            weight = 0;
          }
          if(assignments[i].assignmentPercentage == "N/A"){
            assignments[i].assignmentPercentage = assignments[i].score;
          }
          // if(assignments[i].totalPoint!="100.00"){
          //   assignments[i].assignmentPercentage = (Number(assignments[i].assignmentPercentage.substring(0, assignments[i].assignmentPercentage.length-1))/100.00)*Number(assignments[i].totalPoints);
          //   assignments[i].assignmentPercentage = assignments[i].assignmentPercentage.toString() + "%";
          // }
          sum = sum + ((Number(assignments[i].assignmentPercentage.substring(0, assignments[i].assignmentPercentage.length -1))) * weight)
           total = total + ((Number(assignments[i].totalPoints) ? Number(assignments[i].totalPoints) : 0) * weight)
        }
     }
     console.log("CATEGORY: " + categories[num]);
     console.log("SUM: " + sum);
     console.log("TOTAL: " + total);
     return ((sum/total)*100).toFixed(2);
    })


  const getColor = ((idx:number) => {
    return colors[categories.indexOf(assignments[idx].category)];
  })

  const splitBreakdowns = [];
  // console.log(breakdowns)
  for (let i = 0; i < breakdowns.length; i += 2) {
    splitBreakdowns.push(breakdowns.slice(i, i + 2));
  }
  // console.log(splitBreakdowns);

  // Add a ref for the AnimatedCircularProgress
  const progressRef = useRef<AnimatedCircularProgress>(null);

  useFocusEffect(
    React.useCallback(() => {
        // Animate the grade from 0 to its current value when the component is in focus
        if (progressRef.current) {
            progressRef.current.animate(grade, 700); // animate to grade
        }

        return () => {
            // Optional: Reset the progress when the screen goes out of focus.
            // Note: This step might not be necessary depending on your needs, and you might not need to return a cleanup function at all.
            if (progressRef.current) {
                progressRef.current.animate(0, 0); // animate back to zero
            }
        };
    }, [])
);

  return (
    <ScrollView style={styles.AssignmentScreenContainer}>
      <Text style={styles.AssignmentScreenCourseTitle}>{courseName}</Text>
      <View style={styles.AssignmentScreenTop}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.AssignmentScreenBorderBox}>
            <View style={styles.AssignmentScreenProgressBarContainer}>
              <AnimatedCircularProgress
                ref={progressRef}
                size={145}
                width={16}
                fill={0}
                tintColor="#5b92f9"
                rotation={0}
                backgroundColor="#e9eef1"
                lineCap="round"
              >
                {(fill) => (
                  <>
                    <Text style={styles.AssignmentScreenGradeText}>{fill.toFixed(2)}</Text>
                    <Text style={styles.AssignmentScreenOverallText}>Overall</Text>
                  </>
                )}
              </AnimatedCircularProgress>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.AssignmentScreenCalculateButton, { backgroundColor: '#5b92f9' }]}
                onPress={() => {
                  // Add your logic for the "Calculate" button here
                  console.log('Calculate button pressed');
                }}
              >
                <Text style={styles.AssignmentScreenCalculateButtonText}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
          <View style={styles.AssignmentScreenBreakdownContainer}>
          {splitBreakdowns.map((breakdownPair, index) => (
    <View key={index} style={styles.AssignmentScreenBreakdownColumn}>
      {breakdownPair.map((category) => (
        <TouchableOpacity key={category} activeOpacity={1} style={styles.AssignmentScreenBreakdownBox}>
          <Text style={styles.AssignmentScreenBreakdownLabel}>{category}</Text>
          {/* Pass the index of the category from the entire breakdowns array */}
          <Text style={styles.AssignmentScreenBreakdownValue}>{average(breakdowns.findIndex(c => c === category))}</Text>
          {/* Pass the index of the category from the entire breakdowns array */}
          <View style={[styles.AssignmentScreenBreakdownColor, { backgroundColor: colors[breakdowns.findIndex(c => c === category) % colors.length]}]} />
        </TouchableOpacity>
      ))}
    </View>
  ))}
</View>
          </ScrollView>
        </ScrollView>
      </View>
      <View style={styles.AssignmentScreenBottom}>
        <Text style={styles.AssignmentScreenAssignmentTitle}>Assignments</Text>
        <View>
          {assignments.map((assignment, index) => (
            <TouchableOpacity key={index} style={styles.AssignmentScreenAssignmentBox} activeOpacity={1}>
              <View style={styles.AssignmentScreenAssignmentItem}>
                <View style={[styles.AssignmentScreenBreakdownColorIndicator, { backgroundColor: getColor(index) }]} />
                <View style={styles.AssignmentScreenAssignmentTextContainer}>
                  <Text style={styles.AssignmentScreenAssignmentName}>{assignment.name}</Text>
                  <Text style={styles.AssignmentScreenAssignmentSubtitle}>{assignment.dateDue}</Text>
                </View>
                <View style={styles.AssignmentScreenAssignmentGradeContainer}>
                  <Text style={styles.AssignmentScreenAssignmentGrade}>{assignment.score}</Text>
                  <Text style={styles.AssignmentScreenAssignmentMaxGrade}>{`/${assignment.totalPoints}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


export default AssignmentScreen;
