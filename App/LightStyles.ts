import { Dimensions, StyleSheet } from 'react-native';

const lightStyles = StyleSheet.create({
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
        backgroundColor: '#e8e8e8',
        paddingTop: 10,
      },
      AssignmentScreenCourseTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
      },
      AssignmentScreenTop: {
        flex: 0.4,
        flexDirection: 'row',
        padding: 10,
      },
      AssignmentScreenBorderBox: {
        borderRadius: 15,
        backgroundColor: '#fff',
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
        color: "#005987"
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
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 6,
        width: Dimensions.get('window').width * 0.45,
      },
      AssignmentScreenBreakdownLabel: {
        fontSize: 18,
        fontWeight: 'normal',
      },
      AssignmentScreenBreakdownValue: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      AssignmentScreenBreakdownWeight: {
        fontSize: 14,
      },
      AssignmentScreenBreakdownColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        right: 10,
        bottom: 5,
      },
      AssignmentScreenBottom: {
        flex: 0.6,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
      },
      AssignmentScreenAssignmentTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 3,
        paddingBottom: 3,
      },
      AssignmentScreenAssignmentName: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 3,
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
      },
      AssignmentScreenAssignmentGradeContainer: {
        flex: 0.2,
        alignItems: 'flex-end',
      },
      AssignmentScreenAssignmentGrade: {
        fontSize: 14,
        fontWeight: 'bold',
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
        backgroundColor: '#f2f2f7',
      },
      AttendanceCalendarContainer: {
        borderRadius: 10,
        overflow: 'hidden',
      },
      AttendanceLegendContainer: {
        marginTop: 16,
      },
      AttendanceLegendBox: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
      },
      AttendanceLegendTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
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
      },
      AttendanceDayContainer: {
        alignItems: 'center',
      },
      AttendanceDayText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      AttendanceEmptyBox: {
        width: 20,
        height: 20,
        marginRight: 8,
      },
      CalendarContainer: {
        flex: 1,
        paddingTop: 0,
        },
        CalendarEventContainer: {
        backgroundColor: '#F2F2F2',
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
          color: 'black', // example color
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
            marginHorizontal: 5,
          },
          GradesGradeContainer: {
            backgroundColor: '#E6E6E6',
            borderRadius: 10,
            padding: 12.5,
            marginVertical: 5,
            marginHorizontal: 10,
          },
          GradesGradeItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: -3,
          },
          GradesGradeText: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          GradesGradeBadge: {
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
        
            color: '#e8e8e8',
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
            marginLeft: -95,
            marginBottom: 10,
            marginTop: 10,
            color: "#005987",
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
          GradesInput: {
            height: 45,
            borderColor: '#005987',
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 10,
            borderRadius: 5,
            backgroundColor: '#F0F0F0',
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
          GradesAppButtonText2: {
          fontSize: 18,
          color: 'black',
          alignSelf: 'center',
          fontWeight: 'normal',
          
          },
          HomeContainer: {
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 20,
          },
          HomeHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            paddingLeft: 5,
          },
          HomeScreenIcon:{
            fontSize: 20,
            color: "#005987"

          },
          HomeOptions: {
            backgroundColor: "ebe8e8"
          },
          HomeTitleText: {

          },
        HomeHeaderText: {
            fontSize: 40,
            marginLeft: -85,
            marginBottom:10,
            marginTop: -13,
            color: "#005987",
            fontWeight: "600",
            
          },
          HomeDateText: {
            fontSize: 14,
            color: 'gray',
            marginTop:40,
            marginLeft: 5,
          },
          HomeBox: {
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#dcdcdc',
            marginVertical: 5,
            overflow: 'hidden', // Needed to apply border radius to ListItem
          },
          HomeDescriptionText: {
            color: 'gray',
          },
          HomeChevronIcon: {
            marginLeft: 'auto',
            paddingLeft: 10,
          },
          NewsScreenContainer: {
            flex: 1,
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
                backgroundColor: '#fff',
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
});

export default lightStyles;