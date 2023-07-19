import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

const options = [
  { id: '1', title: 'News', description: 'Popular Stories', iconName: 'newspaper', route: 'NewsScreen' },
  { id: '2', title: 'Quick Links', description: 'Important shortcuts', iconName: 'link', route: 'QuickLinksScreen.tsx' },
  { id: '3', title: 'Bus Tracking', description: 'Track your journey', iconName: 'bus', route: 'News'},
  { id: '4', title: 'Contact Teachers', description: 'Keep in touch', iconName: 'school', route: 'ContactTeachers' },
  { id: '5', title: 'Virtual Assistant', description: 'Talk to our Virtual Chatbot', iconName: 'comments', route: 'VirtualAssistant'},
  { id: '6', title: 'Contact Us', description: 'We are here to help', iconName: 'phone', route: 'News'},
  { id: '7', title: 'Feedback', description: 'We value your opinion', iconName: 'pencil-alt', route: 'GoogleFeedback'},
];

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
};

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}
const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  const navigation = useNavigation();

  const handleOptionPress = (option: { id: string; title: string; description: string; iconName: string; route?: string; webLink?: string;}) => {
    if (option.webLink) {
      Linking.openURL(option.webLink);
    } else if(option.title == "News"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "NewsScreen",
        }
        )
        
      );
      
    } 
    else if(option.title == "Quick Links"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "QuickLinks",
        }
        )
        
      );
      
    } 
    else if(option.title == "Contact Teachers"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "ContactTeachers",
        }
        )
        
      );
      
    } 
    else if(option.title == "Bus Tracking"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "BusTracking",
        }
        )
        
      );
      
    } 
    else if(option.title == "Virtual Assistant"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "VirtualAssistant",
        }
        )
        
      );
      
    } 
    else if(option.title == "Feedback"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "GoogleFeedback",
        }
        )
        
      );
      
    } 
    else if(option.title == "Contact Us"){
      navigation.dispatch(
        CommonActions.navigate({
          name: "ContactUs",
        }
        )
        
      );
      
    } 
  };
  
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <ScrollView contentContainerStyle={styles.HomeContainer}>
      <View style={styles.HomeHeader}>
        <Text style={styles.HomeDateText}>{currentDate}</Text>
        <Text style={styles.HomeHeaderText}>Overview</Text>
      </View>
      {options.map((option) => (
        <TouchableOpacity style={styles.HomeOptions} key={option.id} onPress={() => handleOptionPress(option)}>
          <View style={styles.HomeBox}>
            <ListItem>
              <Icon name={option.iconName} style={styles.HomeScreenIcon} />
              <ListItem.Content>
                <ListItem.Title style={styles.HomeTitleText}>{option.title} </ListItem.Title>
                <ListItem.Subtitle style={styles.HomeDescriptionText}>{option.description}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon name="chevron-right" size={20} style={styles.HomeChevronIcon} />
            </ListItem>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


export default HomeScreen;
