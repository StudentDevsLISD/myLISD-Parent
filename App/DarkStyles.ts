import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const darkStyles = StyleSheet.create({
    AppRunnerOfflineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        },
        AppRunnerOfflineText: {
        marginTop: 8,
        fontSize: 16,
        },
        AssignmentScreenContainer: {
            flex: 1,
            backgroundColor: '#111',
            paddingTop: 10,
          },
          AssignmentScreenCourseTitle: {
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
            color: "#ede1d1"
          },
          AssignmentScreenTop: {
            flex: 0.4,
            flexDirection: 'row',
            padding: 10,
          },
          AssignmentScreenBorderBox: {
            borderRadius: 15,
            backgroundColor: '#222',
            margin: 5,
            borderWidth: 0,
            borderColor: '#ddd',
          },
          AssignmentScreenProgressBarContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 15,
          },
          AssignmentScreenGradeText: {
            fontSize: 28,
            fontWeight: 'bold',
            color: "#ede1d1"
          },
          AssignmentScreenOverallText: {
            fontSize: 16,
            color: 'grey',
          },
          AssignmentScreenBreakdownContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
          AssignmentScreenBreakdownColumn: {
            paddingHorizontal: 5,
          },
          AssignmentScreenBreakdownBox: {
            marginBottom: 5,
            backgroundColor: '#222',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginTop: 6,
            width: Dimensions.get('window').width * 0.45,
            height: 93,
          },
          AssignmentScreenBreakdownLabel: {
            fontSize: 18,
            fontWeight: 'normal',
            color: "white",
          },
          AssignmentScreenBreakdownValue: {
            fontSize: 30,
            fontWeight: 'bold',
            color: "#EDE1D1"
          },
          AssignmentScreenBreakdownWeight: {
            fontSize: 14,
          },
          AssignmentScreenBreakdownColor: {
            width: 25,
            height: 10,
            borderRadius: 5,
            position: 'absolute',
            right: 10,
            bottom: 5,
          },
          AssignmentScreenBottom: {
            flex: 0.6,
            backgroundColor: '#222',
            borderRadius: 10,
            margin: 10,
            padding: 10,
          },
          AssignmentScreenAssignmentTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            paddingTop: 3,
            paddingBottom: 3,
            color: "#EDE1D1",
          },
          AssignmentScreenAssignmentName: {
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 3,
            color: "white",
          },
          AssignmentScreenAssignmentBox: {
            marginBottom: 10,
            paddingHorizontal: 10,
          },
         AssignmentScreenAssignmentItem: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          AssignmentScreenAssignmentTextContainer: {
            flex: 1,
          },
          AssignmentScreenAssignmentSubtitle: {
            fontSize: 14,
            color: "#d3d3d3",
          },
          AssignmentScreenAssignmentGradeContainer: {
            flex: 0.2,
            alignItems: 'flex-end',
          },
          AssignmentScreenAssignmentGrade: {
            fontSize: 14,
            fontWeight: 'bold',
            color: "white"
          },
          AssignmentScreenAssignmentMaxGrade: {
            fontSize: 12,
            color: 'grey',
          },
          AssignmentScreenBreakdownColorIndicator: {
            width: 10,
            height: 35,
            borderRadius: 5,
            marginRight: 10,
          },
          AssignmentScreenCalculateButton: {
            marginTop: 5,
            marginBottom: -5,
            borderRadius: 10,
            paddingVertical: 9,
            paddingHorizontal: 32.5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          AssignmentScreenCalculateButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '800',
          },
          AttendanceContainer: {
            flex: 1,
            padding: 16,
            backgroundColor: '#111',
          },
          AttendanceCalendarContainer: {
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: "#111",
            color: "#fff",
          },
          AttendanceLegendContainer: {
            marginTop: 16,
            backgroundColor: "#111",
          },
          AttendanceLegendBox: {
            backgroundColor: '#222',
            borderRadius: 10,
            padding: 16,
          },
          AttendanceLegendTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
            color: "#ede1d1"
          },
          AttendanceLegendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          },
          AttendanceLegendColorBox: {
            width: 18,
            height: 18,
            borderRadius: 4,
            marginRight: 8,
          },
          AttendanceLegendText: {
            fontSize: 16,
            color: "#fff"
          },
          AttendanceDayContainer: {
            alignItems: 'center',
          },
          AttendanceDayText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 4,
            color: "#fff",
          },
          AttendanceCalendarBox: {
            backgroundColor: '#222',
            calendarBackground: '#222',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: '#fff',
            selectedDayTextColor: '#fff',
            todayTextColor: '#fff',
            dayTextColor: '#fff',
            textDisabledColor: '#fff',
            dotColor: 'transparent',
            selectedDotColor: 'rgba(0, 0, 0, 0)',
            arrowColor: 'black',
            monthTextColor: '#fff',
            indicatorColor: '#fff',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13,
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          },
          AttendanceEmptyBox: {
            width: 20,
            height: 20,
            marginRight: 8,
          },
          CalendarContainer: {
            flex: 1,
            paddingTop: 0,
            backgroundColor: "#222"
            },
            CalendarCalendarContainer: {
              borderRadius: 10,
              overflow: 'hidden',
            },
            CalendarEventContainer: {
            backgroundColor: '#222',
            margin: 10,
            padding: 10,
            borderRadius: 5,
            },
            CalendarEventText: {
            fontSize: 16,
            },
            CalendarGoogleBox: {
            backgroundColor: '#ffffff',
            borderRadius: 15,
            paddingHorizontal: 20,
            paddingRight: 20,
            marginHorizontal: 10,
            paddingBottom: 15,
            width: '95%',
            borderWidth: 2,
            borderColor: '#ebe8e8',
            flexDirection: 'row',
            alignItems: 'center',
            },
            CalendarGoogleImage: {
            width: 60,
            height: 60,
            marginLeft: 20,
            },
            CalendarGoogleText: {
            marginLeft: 20,
            fontSize: 25,
            marginRight: 29,
            },
            CalendarNoEventsText: {
            textAlign: 'center',
            marginTop: 20,
            fontSize: 18,
            },
            CalendarNoEventsText2: {
              textAlign: 'center',
              marginTop: 20,
              fontSize: 22,
              fontWeight: '500',
              color: 'white', // example color
              // ...any other style properties you want...
            },
            CalendarEventEventContainer: {
                backgroundColor: '#ffffff',
                padding: 10,
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                CalendarEventShadowOpacity: 0.1,
                shadowRadius: 1.5,
                elevation: 3,
                flexDirection: 'row',
                overflow: 'hidden',
              },
              CalendarEventBlueStripWrapper: {
                width: 4,
                backgroundColor: '#007AFF',
                borderRadius: 4,
                overflow: 'hidden',
                paddingRight: 6,
              },
              CalendarEventBlueStrip: {
                flex: 1,
                backgroundColor: '#007AFF',
                borderRadius: 4,
              },
              CalendarEventContent: {
                flex: 1,
                flexDirection: 'column',
                marginLeft: 10, // add some left margin
              },
              CalendarEventTime: {
                fontSize: 12,
                color: '#999',
                marginBottom: 2,
              },
              CalendarEventTitle: {
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
                marginBottom: 2,
              },
              CalendarEventLocation: {
                fontSize: 12,
                color: '#999',
              },
              ContactTeacherContainer: {
                flex: 1,
                paddingTop: 20,
                paddingHorizontal: 20,
              },
              ContactTeacherSectionTitle: {
                fontSize: 28,
                fontWeight: '600',
                marginBottom: 5,
                color: "#005987",
              },
              ContactTeacherArticleContainer: {
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
              },
              ContactTeacherTextContainer: {
                flex: 1,
                paddingHorizontal: 15,
              },
              ContactTeacherImage: {
                width: 70,
                height: 70,
              },
              ContactTeacherTitle: {
                fontSize: 18,
                fontWeight: '500',
              },
              ContactTeacherSource: {
                fontSize: 14,
                color: 'grey',
              },
              GradesContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'stretch',
               
                backgroundColor: '#111',
              },
              GradesGradeContainer: {
                backgroundColor: '#333',
                borderRadius: 10,
                padding: 12.5,
                marginVertical: 5,
                marginHorizontal: 10,
              },
              GradesGradeItem: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: -3,
              },
              GradesCourseNameAndNum: {
                flexDirection: 'column',
              },
              GradesGradeText: {
                fontSize: 18,
                fontWeight: 'bold',
                color: "#fff",
              },
              GradesGradeTextCourse: {
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 3,
                color: "#808080",
              },
              GradesGradeBadge: {
                flexDirection: 'row',
                borderRadius: 8,
                paddingHorizontal: 11,
                paddingVertical: 5,
                marginLeft: 10,
              },
              GradesGradeBadgeColor: {
                borderRadius: 8,
                paddingHorizontal: 11,
                paddingVertical: 8,
              },
              GradesGradeBadgeText: {
            
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              },
              GradesGradeBadgeText2: {
            
                color: '#444',
                fontSize: 0,
                fontWeight: 'bold',
              },
              GradesHeader: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                paddingLeft: 5,
              },
              GradesHeaderText: {
                fontSize: 40,
                marginLeft: -92,
                marginBottom: 10,
                marginTop: 10,
                color: "#ede1d1",
                fontWeight: "600",
              },  
              GradesGradientTextContainer: {
                flexDirection: 'row',
                maxWidth: '60%',
                position: 'relative',
              },
              GradesGradientOverlay: {
                position: 'absolute',
                right: 0,
                top: 0,
                width: '30%',
                height: '100%',
              },
              GradesDateText: {
                fontSize: 14,
                color: 'gray',
                marginTop: 58,
                marginLeft: 14,
              },
              GradesInputContainer: {
                padding: 20,
                backgroundColor: '#333',
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 2,
              },
              GradesInput: {
                height: 45,
                borderColor: '#555',
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: '#333',
                color: "black",
              },
              GradesLoginButton: {
                backgroundColor: '#005987',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              },
              GradesLoginButtonText: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              },
              GradesAppButtonContainer2: {
              elevation: 8,
              backgroundColor: '#333',
              borderRadius: 15,
              paddingVertical: 13,
              marginHorizontal: 1.05,
              marginLeft: 10.07,
              marginBottom: 7,
              marginTop: 0,
              width: '94%',
              borderWidth: 2,
              borderColor: '#444',
              fontWeight: 'bold',
          
              
              },
              GradesAppButtonText2: {
              fontSize: 18,
              color: '#fff',
              alignSelf: 'center',
              fontWeight: '500',
              
              },
              GradesNewAssignmentsScrollView: {
                maxHeight: 100,
                marginTop: 5,
                flexDirection: 'row', // Add this line to display new assignments horizontally
                marginHorizontal: 8,
              },
              GradesNewAssignmentTouchable: {
                marginBottom: 5,
                backgroundColor: '#333',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 0, // Increase the height of the touchable area even more
                marginHorizontal: 5,
                justifyContent: 'center', // Vertically center the text
              },
              GradesNewAssignmentText1: {
                fontSize: 18,
                fontWeight: 'normal',
                paddingVertical: 10,
                color: "white",
              },
              GradesNewAssignmentText2: {
                fontSize: 30,
                fontWeight: 'bold',
                paddingVertical: 10,
                color: "white",
              },
              HomeContainer: {
                flexGrow: 1,
                paddingHorizontal: 10,
                paddingTop: 20,
                backgroundColor: "#111",
              },
              HomeContainerLarge: {
               
                backgroundColor: "#111",
              },
              HomeHeader: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                paddingLeft: 5,
              },
            HomeHeaderText: {
                fontSize: 40,
                marginLeft: -91,
                marginBottom:10,
                marginTop: -13,
                color: "#ede1d1",
                fontWeight: "600",
                
              },
              HomeDateText: {
                fontSize: 14,
                color: 'white',
                marginTop:40,
                marginLeft: 5,
              },
              HomeBox: {
                backgroundColor: "#444",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#444',
                marginVertical: 5,
                overflow: 'hidden', // Needed to apply border radius to ListItem
              },
              HomeDescriptionText: {
                color: "#ede1d1",
              },
              HomeChevronIcon: {
                marginLeft: 'auto',
                paddingLeft: 10,
                color: "#ede1d1"
              },
              HomeScreenIcon:{
                fontSize: 20,
                color: "#ede1d1",
    
              },
              HomeOptions: {
                
              },
              HomeTitleText: {
                color: "#e6d5bf",
                fontWeight: "600",

              },
              NewsScreenContainer: {
                flex: 1,
                backgroundColor: "#222",

                paddingTop: 20,
                paddingHorizontal: 20,
              },
              NewsScreenSectionTitle: {
                fontSize: 28,
                fontWeight: '600',
                marginBottom: 5,
                color: "#005987",
              },
              NewsScreenArticleContainer: {
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
              },
              NewsScreenTextContainer: {
                flex: 1,
                paddingHorizontal: 15,
            
              },
              NewsScreenImage: {
                width: 70,
                height: 70,
              },
              NewsScreenTitle: {
                fontSize: 18,
                fontWeight: '500',
              },
              NewsScreenSource: {
                fontSize: 14,
                color: 'grey',
              },
              scrollViewContainer: {
                width: Dimensions.get('window').width,
              },
              QuickLinksContainer: {
                flex: 1,
                backgroundColor: '#fff',
                },
                QuickLinksSearchContainer: {
                backgroundColor: '#fff',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                paddingHorizontal:17,
                paddingTop: 15,
                },
                QuickLinksSearchInputContainer: {
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                },
                QuickLinksSearchInput: {
                color: '#000',
                },
                QuickLinksLinksContainer: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                padding: 10,
                },
                QuickLinksLinkSquare: {
                width: '45%',
                height: 130,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                marginBottom: 20,
                backgroundColor: '#f0f0f0',
                borderWidth: 2,
                borderColor: '#ebe8e8',
                elevation: 3, // for Android
                },
                QuickLinksLinkText: {
                color: '#000',
                fontSize: 16,
                marginBottom: 7, // Creates space between the title and the description
                textAlign: 'center',
                },
                QuickLinksLinkDescription: {
                color: '#888',
                fontSize: 11.5,
                justifyContent:'center',
                textAlign: 'center',
                },
                SettingsContainer: {
                    flex: 1,
                    backgroundColor: '#111',
                    padding: 20,
                  },
                    SettingsSettingRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  },
                  SettingsSettingText: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#fff',
                  },
                  SettingsLogoutButton: {
                    backgroundColor: '#ff6347',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 20
                  },
                  SettingsLogoutButtonText: {
                    color: '#fff',
                    fontSize: 16,
                    marginLeft: 10,
                  },
                  SplashScreenContainer: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  },
                  SplashScreenLogo: {
                    width: 400,
                    height: 400,
                  },
                  GradientTextContainer: {
                    flexDirection: 'row',
                    overflow: 'hidden',
                  },
                  GradientMask: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  },
                  FadedText: {
                    color: '#444',
                  },
                  dotsContainer: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 20, // Optional, adjust the margin as needed
                  },
                  dot: {
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 4,
                  },
                  activeDot: {
                    backgroundColor: 'lightgrey', // Replace with your preferred active dot color
                  },
                  inactiveDot: {
                    backgroundColor: 'grey', // Replace with your preferred inactive dot color
                  },
                  dotview: {
                      marginVertical: -15,
                      marginBottom: -20,
                  },
});

export default darkStyles;