import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { RouteProp } from '@react-navigation/native';


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
  const colors = ["#00ff00", "#ff0000", "#000ff", "#5ebbe6", "#9de65a", "#e6ae5a"]
  console.log(data);

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
    let y = [];
    let updatedBreakdowns = [];
  
    for (let i = 0; i < assignments.length; i++) {
      y.push(assignments[i].category);
    }
    
    y = y.filter(function(item, pos) {
      return y.indexOf(item) === pos;
    });
    
    // Assuming that you have predefined weights and colors, let's create new breakdowns
    y.forEach((category, index) => {
      updatedBreakdowns.push({
        label: category, // update this value accordingly
        weight: '1.0', // update this value accordingly // update this value accordingly
      });
    });
  
    setCategories(y);
    setBreakdowns(updatedBreakdowns); // You should have state for breakdowns: const [breakdowns, setBreakdowns] = useState([]);
  }, [assignments]);// It will only rerun this effect if 'assignments' change
  
  const average = ((num: number) => {
    let sum = 0;
    let total = 0;
    let weight = 0.00;
    for(let i =0; i<assignments.length; i++){
      if(categories[num] == assignments[i].category){
        if(assignments[i].weight == "N/A"){
          console.log(assignments[i].score)
          weight = 1;
        } else {
          weight = Number(assignments[i].weight);
        }
        sum = sum + ((Number(assignments[i].score) ? Number(assignments[i].score) : Number(assignments[i].totalPoints)) * weight)
         total = total + ((Number(assignments[i].totalPoints) ? Number(assignments[i].totalPoints) : 0) * weight)
      }
   }
   return ((sum/total)*100).toFixed(2);
  })

  const getColor = ((idx:number) => {
    return colors[categories.indexOf(assignments[idx].category)];
  })

  const splitBreakdowns = [];
  for (let i = 0; i < breakdowns.length; i += 2) {
    splitBreakdowns.push(breakdowns.slice(i, i + 2));
  }

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
    <ScrollView style={styles.container}>
      <Text style={styles.courseTitle}>{courseName}</Text>
      <View style={styles.top}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.borderBox}>
            <View style={styles.progressBarContainer}>
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
                    <Text style={styles.gradeText}>{fill.toFixed(2)}</Text>
                    <Text style={styles.overallText}>Overall</Text>
                  </>
                )}
              </AnimatedCircularProgress>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.calculateButton, { backgroundColor: '#5b92f9' }]}
                onPress={() => {
                  // Add your logic for the "Calculate" button here
                  console.log('Calculate button pressed');
                }}
              >
                <Text style={styles.calculateButtonText}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
            <View style={styles.breakdownContainer}>
              {splitBreakdowns.map((breakdownPair, index) => (
                <View key={index} style={styles.breakdownColumn}>
                  {breakdownPair.map((item, idx) => (
                    <TouchableOpacity key={idx} activeOpacity={1} style={styles.breakdownBox}>
                      <Text style={styles.breakdownLabel}>{categories[idx]}</Text>
                      <Text style={styles.breakdownValue}>{average(idx)}</Text>
                      <Text style={styles.breakdownWeight}>{`Weight: ${item.weight}`}</Text>
                      <View style={[styles.breakdownColor, { backgroundColor: colors[idx]}]} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.assignmentTitle}>Assignments</Text>
        <View>
          {assignments.map((assignment, index) => (
            <TouchableOpacity key={index} style={styles.assignmentBox} activeOpacity={1}>
              <View style={styles.assignmentItem}>
                <View style={[styles.breakdownColorIndicator, { backgroundColor: getColor(index) }]} />
                <View style={styles.assignmentTextContainer}>
                  <Text style={styles.assignmentName}>{assignment.name}</Text>
                  <Text style={styles.assignmentSubtitle}>{assignment.dateDue}</Text>
                </View>
                <View style={styles.assignmentGradeContainer}>
                  <Text style={styles.assignmentGrade}>{assignment.score}</Text>
                  <Text style={styles.assignmentMaxGrade}>{`/${assignment.totalPoints}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingTop: 10,
  },
  courseTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  top: {
    flex: 0.4,
    flexDirection: 'row',
    padding: 10,
  },
  borderBox: {
    borderRadius: 15,
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 0,
    borderColor: '#ddd',
  },
  progressBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  gradeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#005987"
  },
  overallText: {
    fontSize: 16,
    color: 'grey',
  },
  breakdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  breakdownColumn: {
    paddingHorizontal: 5,
  },
  breakdownBox: {
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 6,
    width: Dimensions.get('window').width * 0.45,
  },
  breakdownLabel: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  breakdownValue: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  breakdownWeight: {
    fontSize: 14,
  },
  breakdownColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  bottom: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  assignmentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingBottom: 3,
  },
  assignmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 3,
  },
  assignmentBox: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  assignmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignmentTextContainer: {
    flex: 1,
  },
  assignmentSubtitle: {
    fontSize: 14,
  },
  assignmentGradeContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  assignmentGrade: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  assignmentMaxGrade: {
    fontSize: 12,
    color: 'grey',
  },
  breakdownColorIndicator: {
    width: 10,
    height: 35,
    borderRadius: 5,
    marginRight: 10,
  },
  calculateButton: {
    marginTop: 5,
    marginBottom: -5,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default AssignmentScreen;
