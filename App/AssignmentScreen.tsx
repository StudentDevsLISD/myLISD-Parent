import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useFocusEffect } from '@react-navigation/native';

const AssignmentScreen = () => {
  const grade = 88.53;
  const courseName = 'Algebra 101';
  const breakdowns = [
    { label: 'Completed', value: '70.00%', weight: '0.1', color: '#00ff00' },
    { label: 'In Progress', value: '20.00%', weight: '0.1', color: '#ff0000' },
    { label: 'Not Started', value: '10.00%', weight: '0.1', color: '#0000ff' },
  ];
  const assignments = [
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Science Project', subtitle: '02/03/2023', grade: '86.00', maxGrade: '100.00', breakdownColor: '#ff0000' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
    // Other assignments...
  ];

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
    <View style={styles.container}>
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
                      <Text style={styles.breakdownLabel}>{item.label}</Text>
                      <Text style={styles.breakdownValue}>{item.value}</Text>
                      <Text style={styles.breakdownWeight}>{`Weight: ${item.weight}`}</Text>
                      <View style={[styles.breakdownColor, { backgroundColor: item.color }]} />
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
        <ScrollView>
          {assignments.map((assignment, index) => (
            <TouchableOpacity key={index} style={styles.assignmentBox} activeOpacity={1}>
              <View style={styles.assignmentItem}>
                <View style={[styles.breakdownColorIndicator, { backgroundColor: assignment.breakdownColor }]} />
                <View style={styles.assignmentTextContainer}>
                  <Text style={styles.assignmentName}>{assignment.title}</Text>
                  <Text style={styles.assignmentSubtitle}>{assignment.subtitle}</Text>
                </View>
                <View style={styles.assignmentGradeContainer}>
                  <Text style={styles.assignmentGrade}>{assignment.grade}</Text>
                  <Text style={styles.assignmentMaxGrade}>{`/${assignment.maxGrade}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
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
    padding: 15,
    borderRadius: 15,
  },
  gradeText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    marginBottom: 15,
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
