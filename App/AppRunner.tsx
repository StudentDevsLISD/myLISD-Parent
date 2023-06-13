import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsDropdown from './SettingsDropdown';
import NetInfo from '@react-native-community/netinfo';
import Home from './Home';
import Portal from './Portal';
import IDs from './ID';
import ClubHub from './ClubHub';
import Community from './ComOp';
import SplashScreen from './SplashScreen';
import { AuthProvider } from './AuthContext';
import SettingsScreen from './SettingsDropdown';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import NewsScreen from './NewsScreen';
import ContactTeachersScreen from './ContactTeacher';



const Tab = createBottomTabNavigator();

const handleLogout = async (navigation: NavigationProp<any>) => {
  await AsyncStorage.removeItem('username');
  await AsyncStorage.removeItem('password');
  navigation.navigate('Login');
};

export type HandleLogout = (navigation: NavigationProp<any>) => Promise<void>;
const Tab1Screen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);

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
        <View style={styles.offlineContainer}>
          <Icon name="wifi" size={32} color="#888" />
          <Text style={styles.offlineText}>No Internet Connection</Text>
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

  useEffect(() => {
    const setTheCampuses = async () => {
      var x = await AsyncStorage.getItem("campus");
      var y = await AsyncStorage.getItem("subcampus");
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

  if (campus === "" || school === "") {
    return (
      <View style={styles.offlineContainer}>
        <ActivityIndicator size="large" color="#005a87" />
      </View>
    );
  }
  return (
    <>
      {isConnected ? (
        <Community/>
      ) : (
        <View style={styles.offlineContainer}>
          <Icon name="wifi" size={32} color="#888" />
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )}
    </>
  );
};



const Tab3Screen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);

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
 
  return <IDs />;
};

const Tab4Screen = () => {
const navigation = useNavigation();
const [isConnected, setIsConnected] = useState(false);
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
      <ClubHub />
    ) : (
      <View style={styles.offlineContainer}>
        <Icon name="wifi" size={32} color="#888" />
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    )}
  </>
);
};

const Tab5Screen = () => {
const navigation = useNavigation();
const [isConnected, setIsConnected] = useState(false);
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
      <SettingsScreen handleLogout={handleLogout}/>
    ) : (
      <View style={styles.offlineContainer}>
        <Icon name="wifi" size={32} color="#888" />
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    )}
  </>
);
};

const tabBarOptions = {
headerTitle: () => (
<View style={{ alignItems: 'center' }}>
<Image source={require('../assets/lisd_white_2.jpg')} style={{ width: 258, height: 68, marginBottom: 12, marginLeft: 10,}} />
</View>
),
headerStyle: {
backgroundColor: '#005a87',
height: 125,
// marginBottom: 0,
},
};



const Stack = createStackNavigator();
const Tabs: React.FC = () => {
  return <Tab.Navigator 
  // screenOptions={tabBarOptions}
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
        tabBarIcon: ({ color, size }) => <Icon name="school" color={color} size={size} />,
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
useEffect(() => {
  setTimeout(() => {
    setIsAppReady(true);
  }, 1500);
}, []);

if (!isAppReady) {
  return <SplashScreen />;
}

return (
  <AuthProvider>
  <Stack.Navigator screenOptions={tabBarOptions}>
      <Stack.Screen name ="HomeScreen" component={Tabs} options={{ headerShown: true}}/>
      <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="ContactTeachers" component={ContactTeachersScreen} options={{ headerShown: true }}/>
  </Stack.Navigator>
  </AuthProvider>
);
};

const styles = StyleSheet.create({
offlineContainer: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
offlineText: {
marginTop: 8,
fontSize: 16,
},
});

export default AppRunner;

 
        
