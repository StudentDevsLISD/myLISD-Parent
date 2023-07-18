import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { Calendar } from 'react-native-calendars';
import CalendarEvent from './CalendarEvent';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

type GoogleSigninUser = {
  idToken: string;
  accessToken?: string | null | undefined;
  refreshToken?: string | null | undefined;
  serverAuthCode?: string | null | undefined;
  scopes?: string[] | null | undefined;
  user: {
    id: string;
    email: string | null;
    emailVerified?: boolean;
    photoURL?: string;
    displayName?: string;
  } | null;
};
type Event = {
  id: string;
  summary: string;
  start: string;
  end: string;
  location: string;
  description: string;
};
interface GoogleSigninUserWithAccessToken extends GoogleSigninUser {
  accessToken: string;
}


GoogleSignin.configure({
  iosClientId: '809923761821-5lio914f08csk2hgkufapgh19l0418n0.apps.googleusercontent.com',
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const ComOp = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [events, setEvents] = useState<Event[]>([]);
  const [uniqueEvents, setUniqueEvents] = useState<Event[]>([]);
  
  const calendarId = 'leanderisd.org_3grot6ac0ug4prua1smkvfsmu8@group.calendar.google.com';
  const apiKey = 'AIzaSyCOo9kMxZpioPalyxTzZ6aVkxDgyzBf-XE';  // replace with your public API key

  const removeDuplicateEvents = (eventsArray: any[]) => {
    const uniqueEvents = eventsArray.reduce((accumulator: any[], event: any) => {
      if (!accumulator.find((e: any) => e.id === event.id)) {
        accumulator.push(event);
      }
      return accumulator;
    }, []);
    return uniqueEvents;
  };


  const fetchEvents = async (calendarId: string, date: string) => {
    setIsLoading(true);
    const timeMin = new Date(date);
    timeMin.setDate(timeMin.getDate())
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date(date);
    timeMax.setDate(timeMax.getDate() + 1);
    timeMax.setHours(23, 59, 59, 999);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`,
        {
          params: {
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
          },
        },
      );

      const events = response.data.items;
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents(calendarId, selectedDate);
        const uniqueEvents = removeDuplicateEvents(fetchedEvents);
        setEvents(uniqueEvents);
      } catch (error) {
        console.error('Error fetching and setting events:', error);
      }
    };
    fetchAndSetEvents();
  }, [selectedDate]);


  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };


  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;
      
  return (
    <View style={styles.CalendarContainer}>
      <Calendar onDayPress={handleDayPress} markedDates={{ [selectedDate]: { selected: true } }} />
      {isLoading ? (
        <ActivityIndicator animating={true} size={'large'} color={'#005a87'}/>
      ) : (
        <ScrollView>
          {/* //...events list or "No events found" message */}
          {events.length > 0 ? (
            events.map((event: Event) => (
              <CalendarEvent key={event.id} id={event.id} summary={event.summary} start={event.start} end={event.end} />
            ))
          ) : (
            <Text style={styles.CalendarNoEventsText2}>No Events Today</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}  
      
      
      export default ComOp;