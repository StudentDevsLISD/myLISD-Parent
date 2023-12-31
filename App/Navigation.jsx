import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './AppRunner';
import { storeData, retrieveData, removeItem } from './storage.js';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      const username = await retrieveData('username');
      const password = await retrieveData('password');
  
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
