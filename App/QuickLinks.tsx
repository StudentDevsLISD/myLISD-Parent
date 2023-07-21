import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

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

interface QuickLinkProps {
link: string;
title: string;
description: string;
navigation: NavigationProp<RootStackParamList, 'Home'>
}


const QuickLink: React.FC<QuickLinkProps> = ({ link, title, description, navigation }) => {
    
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;
  
  return (
        <TouchableOpacity style={styles.QuickLinksLinkSquare} onPress={() => {
            navigation.dispatch(
                CommonActions.navigate({
                  name: "WebViewScreen",
                  params: { url: link },
                }
                )
                
            );
        }}>
            <Text style={styles.QuickLinksLinkText}>{title}</Text>
            <Text style={styles.QuickLinksLinkDescription}>{description}</Text>
        </TouchableOpacity>
    );
}



const QuickLinks = () => {
const [search, setSearch] = useState('');
const linksData = [
{ title: "Registration", link: "https://www.leanderisd.org/registration/", description: "Enroll New Students or Register Current Students" },
{ title: "Attendance and Absences", link: "https://www.leanderisd.org/attendance/", description: "report an absence, absence notes, excused vs. unexcused absences." },
{ title: "Meals and Menus", link: "https://www.leanderisd.org/childnutritionservices/", description: "Menus, online ordering, meal balance and payment portal" },
{ title: "Calendar", link: "https://www.leanderisd.org/calendar/", description: "District events and year-at-a-glance academic calendars" },
{ title: "Bus Routes", link: "https://www.leanderisd.org/transportation/", description: "Bus routing information, schedules and safety information" },
{ title: "Home Access Center", link: "https://lis-hac.eschoolplus.powerschool.com/HomeAccess/", description: "The parent and student portal for grades, schedules, and student info" },
{ title: "mLISD Empowered Learning", link: "https://www.leanderisd.org/mlisd/", description: "Student technology for Prekindergarten through Grade 12" },
{ title: "PTA", link: "https://www.leanderisd.org/volunteering/#pta", description: "A grassroots organization made up of parents, teachers and others" },
{ title: "Committees", link: "https://www.leanderisd.org/committees/", description: "District-level committee information" },
{ title: "Booster Clubs and Fundraisers", link: "https://www.leanderisd.org/volunteering/#booster", description: "Guidelines and Training Information" },
{ title: "Flyer Distribution", link: "https://www.leanderisd.org/flyers/", description: "Electronic flyer distribution through the Peachjar system" },
{ title: "Public Information Act Requests", link: "https://www.leanderisd.org/legalservices/#pia", description: "Leander ISD complies fully with the Texas Public Information Act"},
{ title: "Clothes Closet", link: "https://www.leanderisd.org/clothescloset/", description: "Provides School Clothing to Students in need" },
{ title: "LEEF", link: "https://leeftx.org/", description: "Leander Education Excellence Foundation" },
{ title: "Attendance Zones", link: "https://www.leanderisd.org/attendancezones/", description: "School Boundary and Assignment Areas" },
{ title: "Immunizations", link: "https://www.leanderisd.org/immunizations/", description: "Requirements, documentation information and additional resources" },




// add as many links as needed
];


const filteredLinksData = linksData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));


const navigation = useNavigation();


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

const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

return (
<View style={styles.QuickLinksContainer}>
<SearchBar
placeholder="Search Link"
onChangeText={setSearch}
value={search}
containerStyle={styles.QuickLinksSearchContainer}
inputContainerStyle={styles.QuickLinksSearchInputContainer}
inputStyle={styles.QuickLinksSearchInput}
/>
<ScrollView contentContainerStyle={styles.QuickLinksLinksContainer}>
{filteredLinksData.map((item, index) => (
<QuickLink key={index} title={item.title} link={item.link} description={item.description} navigation ={navigation}/>
))}
</ScrollView>
</View>
);
}

export default QuickLinks;
















