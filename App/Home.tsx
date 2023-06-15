import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, CommonActions } from '@react-navigation/native';

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
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.headerText}>Overview</Text>
      </View>
      {options.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => handleOptionPress(option)}>
          <View style={styles.box}>
            <ListItem>
              <Icon name={option.iconName} size={20} color="#005987" />
              <ListItem.Content>
                <ListItem.Title>{option.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.descriptionText}>{option.description}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon name="chevron-right" size={20} color="gray" style={styles.chevronIcon} />
            </ListItem>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 5,
  },
  headerText: {
    fontSize: 40,
    marginLeft: -98,
    marginBottom:10,
    marginTop: -13,
    color: "#005987",
    fontWeight: "600",
    
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginTop:40,
    marginLeft: 5,
  },
  box: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginVertical: 5,
    overflow: 'hidden', // Needed to apply border radius to ListItem
  },
  descriptionText: {
    color: 'gray',
  },
  chevronIcon: {
    marginLeft: 'auto',
    paddingLeft: 10,
  },
});

export default HomeScreen;
