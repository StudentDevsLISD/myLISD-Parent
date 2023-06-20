import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AssignmentScreen = () => {
    const progress = 70;
    const grade = 88.53;
    const courseName = "Algebra 101";
    const breakdowns = [
        { label: 'Completed', value: '70%', weight: '0.1', color: '#00ff00' },
        { label: 'In Progress', value: '20%', weight: '0.1', color: '#ff0000' },
        { label: 'Not Started', value: '10%', weight: '0.1', color: '#0000ff' },
        // Add more breakdowns as needed
    ];
    const assignments = [
        { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
        { title: 'Science Project', subtitle: '02/03/2023', grade: '86.00', maxGrade: '100.00', breakdownColor: '#ff0000' },
        { title: 'Math Assignment', subtitle: '01/02/2023', grade: '94.00', maxGrade: '100.00', breakdownColor: '#00ff00' },
        // Add more assignments as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.courseTitle}>{courseName}</Text>
            <View style={styles.top}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.borderBox}>
                        <View style={styles.progressBarContainer}>
                            <AnimatedCircularProgress
                                size={145}
                                width={16}
                                fill={progress}
                                tintColor="#5b92f9"
                                rotation={-90}
                                backgroundColor="#e9eef1">
                                {(fill) => (
                                    <>
                                        <Text style={styles.gradeText}>{`${grade.toFixed(2)}`}</Text>
                                        <Text style={styles.overallText}>Overall</Text>
                                    </>
                                )}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                    <View style={styles.breakdownContainer}>
                        {breakdowns.map((item, index) => (
                            <View key={index} style={styles.borderBox}>
                                <View style={styles.breakdownItem}>
                                    <Text style={styles.breakdownLabel}>{item.label}</Text>
                                    <Text style={styles.breakdownValue}>{item.value}</Text>
                                    <Text style={styles.breakdownWeight}>{`Weight: ${item.weight}`}</Text>
                                    <View style={[styles.breakdownColor, {backgroundColor: item.color}]} />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.assignmentTitle}>Assignments</Text>
                <ScrollView>
                    {assignments.map((assignment, index) => (
                        <View key={index} style={styles.borderBox}>
                            <View style={styles.assignmentItem}>
                                <View style={[styles.breakdownColorIndicator, {backgroundColor: assignment.breakdownColor}]} />
                                <View style={styles.assignmentTextContainer}>
                                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                                    <Text style={styles.assignmentSubtitle}>{assignment.subtitle}</Text>
                                </View>
                                <View style={styles.assignmentGradeContainer}>
                                    <Text style={styles.assignmentGrade}>{assignment.grade}</Text>
                                    <Text style={styles.assignmentMaxGrade}>{`/${assignment.maxGrade}`}</Text>
                                </View>
                            </View>
                        </View>
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
        paddingVertical: -1,
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
        flexDirection: 'column',
        flexWrap: 'nowrap',

    },
    breakdownItem: {
        width: '100%',
        padding: 8,
        paddingLeft: 15,
        paddingRight: 55,
        borderRadius: 0,
        margin: 3.6,
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
        right:15,
        bottom: 10,
    },
    bottom: {
        flex: 0.6,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    assignmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 3,
    },
    assignmentItem: {
        flexDirection: 'row',
        padding: 5,
        marginVertical: -8,
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
});

export default AssignmentScreen;
