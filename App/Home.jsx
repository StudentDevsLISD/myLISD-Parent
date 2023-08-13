import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Text, ScrollView, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

const options = [
  { id: '1', title: 'News', description: 'Popular Stories', iconName: 'newspaper-o', route: 'NewsScreen' },
  { id: '2', title: 'Quick Links', description: 'Important shortcuts', iconName: 'link', route: 'QuickLinksScreen.tsx' },
  { id: '3', title: 'Bus Tracking', description: 'Track your journey', iconName: 'bus', route: 'News'},
  { id: '4', title: 'Contact Teachers', description: 'Keep in touch', iconName: 'users', route: 'ContactTeachers' },
  { id: '5', title: 'LISD Homepage', description: 'Leander ISD Homepage', iconName: 'laptop', route: 'VirtualAssistant' },

  { id: '6', title: 'LISD Support Page', description: 'Leander ISD Support', iconName: 'comments', route: 'SupportPage' },
  //{ id: '5', title: 'Virtual Assistant', description: 'Talk to our Virtual Chatbot', iconName: 'comments', route: 'VirtualAssistant'},
  { id: '7', title: 'Contact Us', description: 'We are here to help', iconName: 'phone', route: 'News'},
  { id: '8', title: 'Feedback', description: 'We value your opinion', iconName: 'thumbs-up', route: 'GoogleFeedback'},
];


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

  const handleOptionPress = (option) => {
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
      Linking.openURL("https://parent.smart-tag.net/%40leanderisd");
      
    } 
    else if(option.title == "Virtual Assistant"){
      Linking.openURL("https://www.leanderisd.org")
      
    } 
    else if(option.title == "LISD Support Page"){
      Linking.openURL("https://www.leanderisd.org/support/")
      
    } 
    else if(option.title == "LISD Homepage"){
      Linking.openURL("https://www.leanderisd.org")

    }
    else if(option.title == "Feedback"){
      Linking.openURL("https://forms.gle/5sm5X6vhA9zLLFFC6")
      
    } 
    else if(option.title == "Contact Us"){
      Linking.openURL("https://www.k12insight.com/Lets-Talk/LetsTalkTabCustom.aspx?k=WKXY9FLT&rnd=1686678916022")
      
    } 
  };
  
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style = {styles.HomeContainerLarge}>
    <ScrollView contentContainerStyle={styles.HomeContainer}>
      <View style={styles.HomeHeader}>
        <Text style={styles.HomeDateText}>{currentDate}</Text>
        <Text style={styles.HomeHeaderText}>Overview</Text>
      </View>
      {options.map((option) => (
        <TouchableOpacity style={styles.HomeOptions} key={option.id} onPress={() => handleOptionPress(option)}>
          <View style={styles.HomeBox}>
            <ListItem containerStyle={theme === 'light' ? {backgroundColor: "white"} : {backgroundColor: "#333"}}>
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
    </View>
  );
};


export default HomeScreen;
