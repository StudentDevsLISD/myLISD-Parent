import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './AppRunner';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
  
      if (username && password) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
  
    checkAuthentication();
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        // You can show a loading indicator while checking AsyncStorage
        <Text>Loading...</Text>
      ) : (
        // Include the Login screen in both cases
        <Stack.Navigator initialRouteName={/* isAuthenticated ?  */"Home" /* : "Login" */}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="NewsScreen"
            component={NewsScreen}
            options={{
              headerShown: true,
            }}
          /> */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;