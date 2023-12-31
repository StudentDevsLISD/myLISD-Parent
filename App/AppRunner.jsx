import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsDropdown from './SettingsDropdown';
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator } from 'react-native-paper';
import Home from './Home';
import Calendar from './Calendar';
import SplashScreen from './SplashScreen';
import SettingsScreen from './SettingsDropdown';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import NewsScreen from './NewsScreen';
import ContactTeachersScreen from './ContactTeacher';
import Feedback from './GoogleFeedback';
import Grades from './Grades';
import Attendance from './Attendance';
import BusTracking from './BusTracking';
import ContactUs from './ContactUs';
import GoogleFeedback from './GoogleFeedback';
import QuickLinks from './QuickLinks';
import VirtualAssistant from './VirtualAssistant';
import AssignmentScreen from './AssignmentScreen';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';
import SupportPage from './SupportPage';
import { storeData, retrieveData, removeItem } from './storage.js';





const Tab = createBottomTabNavigator();

const handleLogout = async (navigation) => {
  await removeItem('username');
  await removeItem('password');
  navigation.navigate('Login');
};

const handleHACLogout = async (navigation) => {
  await removeItem('hacusername');
  await removeItem('hacpassword');
  navigation.navigate('Grades', { justLoggedOut: true });
};

export const HandleLogout = (navigation) => {};
const Tab1Screen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);

  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => <SettingsDropdown handleLogout={handleLogout} />,
    // });
    NetInfo.fetch().then(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <>
      {isConnected ? (
        <Home />
      ) : (
        <View style={styles.AppRunnerOfflineContainer}>
          <Icon name="wifi" size={32} color="#888" />
          <Text style={styles.AppRunnerOfflineText}>No Internet Connection</Text>
        </View>
      )}
    </>
  );
};

const Tab2Screen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  const [campus, setCampus] = useState("");
  const [school, setSchool] = useState("");
  const [subCampus, setSubCampus] = useState("");
  const [isMainCampusSelected, setIsMainCampusSelected] = useState(true);

  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  useEffect(() => {
    const setTheCampuses = async () => {
      var x = await retrieveData("campus");
      var y = await retrieveData("subcampus");
      setCampus(x ?? "");
      setSubCampus(y ?? x ?? "");

      // Set the initial value of school based on isMainCampusSelected
      setSchool(isMainCampusSelected ? (x ?? "") : (y ?? x ?? ""));
    };
    setTheCampuses();
  }, []);


  // Add this function to switch between main and sub campus
  const switchCampus = () => {
    setIsMainCampusSelected(!isMainCampusSelected);
    setSchool(isMainCampusSelected ? subCampus : campus);
  };

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, school]);

  // if (campus === "" || school === "") {
  //   return (
  //     <View style={styles.AppRunnerOfflineContainer}>
  //       <ActivityIndicator animating={true} size={'large'} color={theme=='light' ? '#005a87' : '#ede1d1'}/>
  //     </View>
  //   );
  // }
  return (
    <>
      {isConnected ? (
        <Calendar/>
      ) : (
        <View style={styles.AppRunnerOfflineContainer}>
          <Icon name="wifi" size={32} color = "#888" />
          <Text style={styles.AppRunnerOfflineText}>No Internet Connection</Text>
        </View>
      )}
    </>
  );
};



const Tab3Screen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);

  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => <SettingsDropdown handleLogout={() => handleLogout(navigation)} />,
    // });
    NetInfo.fetch().then(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
 
  return <Attendance />;
};

const Tab4Screen = () => {
const navigation = useNavigation();
const [isConnected, setIsConnected] = useState(false);

const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

useEffect(() => {
  // navigation.setOptions({
  //   headerRight: () => <SettingsDropdown handleLogout={() => handleLogout(navigation)} />,
  // });
  NetInfo.fetch().then(state => {
    if (state.isConnected !== null) {
      setIsConnected(state.isConnected);
    }
  });
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected !== null) {
      setIsConnected(state.isConnected);
    }
  });
  return () => {
    unsubscribe();
  };
}, [navigation]);

return (
  <>
    {isConnected ? (
      <Grades/>
    ) : (
      <View style={styles.AppRunnerOfflineContainer}>
        <Icon name="wifi" size={32} color="#888" />
        <Text style={styles.AppRunnerOfflineText}>No Internet Connection</Text>
      </View>
    )}
  </>
);
};

const Tab5Screen = () => {
const navigation = useNavigation();
const [isConnected, setIsConnected] = useState(false);

const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

useEffect(() => {
  // navigation.setOptions({
  //   headerRight: () => <SettingsDropdown handleLogout={() => handleLogout(navigation)} />,
  // });
  NetInfo.fetch().then(state => {
    if (state.isConnected !== null) {
      setIsConnected(state.isConnected);
    }
  });
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected !== null) {
      setIsConnected(state.isConnected);
    }
  });
  return () => {
    unsubscribe();
  };
}, [navigation]);

return (
  <>
    {isConnected ? (
      <SettingsScreen handleLogout={handleLogout} handleHACLogout={handleHACLogout} />
    ) : (
      <View style={styles.AppRunnerOfflineContainer}>
        <Icon name="wifi" size={32} color="#888" />
        <Text style={styles.AppRunnerOfflineText}>No Internet Connection</Text>
      </View>
    )}
  </>
);
};




const Stack = createStackNavigator();
const Tabs = () => {
  const {theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;
  const screenHeight = Dimensions.get('window').height;

  const tabBarOptions = {
    headerTitle: () => (
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../assets/lisd_white_2.jpg')} style={{ width: 258, height: 68, marginBottom: 11, alignSelf: 'center' }} />
      </View>
    ),
    headerStyle: {
      backgroundColor: '#005a87',
      height: screenHeight*0.16,
    },
    tabBarStyle: {
      backgroundColor: theme === 'light' ? 'white' : '#111', // Set the background color of the tab bar to black
      paddingTop: 10,
      height: screenHeight*0.1
    },
    tabBarActiveTintColor: theme === 'dark' ? '#ede1d1' : '#007AFF',
    tabBarInactiveTintColor: theme === 'dark' ? '#666666' : '#8E8E93'
    // ... other options ...
  };
  return <Tab.Navigator 
  screenOptions={tabBarOptions}
  >
    <Tab.Screen
      name="Home"
      component={Tab1Screen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        headerShown: false
      }} />
    <Tab.Screen
      name="Calendar"
      component={Tab2Screen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="calendar" color={color} size={size} />,
        headerShown: false
      }} />
    <Tab.Screen
      name="Attendance"
      component={Tab3Screen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="bell" color={color} size={size} />,
        headerShown: false
      }} />
    <Tab.Screen
      name="Grades"
      component={Tab4Screen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="bar-chart" color={color} size={size} />,
        headerShown: false
      
      }} />
    <Tab.Screen
      name="Settings"
      component={Tab5Screen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="cog" color={color} size={size} />,
        headerShown: false
      }} />
  </Tab.Navigator>;
}
// const NewsScreenHeader = () => (
//   <View style={{ alignItems: 'center' }}>
//     <Image source={require('../assets/lisd_white_2.jpg')} style={{ width: 258, height: 68, marginBottom: 12, marginLeft: 10 }} />
//   </View>
// );
const AppRunner = () => {
const [isAppReady, setIsAppReady] = useState(false);
const screenHeight = Dimensions.get('window').height;


useEffect(() => {
  setTimeout(() => {
    setIsAppReady(true);
  }, 1500);
}, []);

if (!isAppReady) {
  return <SplashScreen />;
}

return (
  <ThemeProvider>
  <Stack.Navigator screenOptions={{headerTitle: () => (
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../assets/lisd_white_2.jpg')} style={{ width: 258, height: 68, marginBottom: 11, alignSelf: 'center' }} />
      </View>
    ),
    headerStyle: {
      backgroundColor: '#005a87',
      height: screenHeight*0.16,
    },}}>
      <Stack.Screen name ="HomeScreen" component={Tabs} options={{ headerShown: true}}/>
      <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="ContactTeachers" component={ContactTeachersScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="QuickLinks" component={QuickLinks} options={{ headerShown: true }}/>
      <Stack.Screen name="BusTracking" component={BusTracking} options={{ headerShown: true }}/>
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: true }}/>
      <Stack.Screen name="GoogleFeedback" component={GoogleFeedback} options={{ headerShown: true }}/>
      <Stack.Screen name="VirtualAssistant" component={VirtualAssistant} options={{ headerShown: true }}/>
      <Stack.Screen name="AssignmentScreen" component={AssignmentScreen} options={{ headerShown: true }}/>

      <Stack.Screen name="SupportPage" component={SupportPage} options={{ headerShown: true }}/>
  </Stack.Navigator>
  </ThemeProvider>
);
};


export default AppRunner;