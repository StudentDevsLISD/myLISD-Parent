import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LISD_CLIENT_AUTH_UN, LISD_CLIENT_AUTH_PWD, LISD_API_KEY } from '@env';


const loginurl = "https://api.leanderisd.org/portal/login";

type RootStackParamList = {
  Home: undefined;
  Details: { id: number };
};

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};
// type Props = StackScreenProps<RootStackParamList, 'Home'>;
const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const data = { "username": username, "password": password };
      const response = await axios.post(loginurl, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'clientAuthUN': LISD_CLIENT_AUTH_UN,
            'clientAuthPwd': LISD_CLIENT_AUTH_PWD,
        },
        params: {
          APIKey: LISD_API_KEY,
        }
  
      });
      if (response.data.status === "success") {
        console.log(response.data);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('studentID', response.data.id)
        await AsyncStorage.setItem('firstName', response.data.first)
        await AsyncStorage.setItem('lastName', response.data.last)
        await AsyncStorage.setItem('grade', response.data.grade)
        await AsyncStorage.setItem('campus', response.data.campus);
        await AsyncStorage.setItem('subcampus', response.data.subcampus ? response.data.subcampus : "");
        console.log("done")
        // Reset the navigation stack and navigate to the Home screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
        
      } else {
        setErrorMessage('Incorrect username or password');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require('../assets/lisd.png')}
        />  
      <Text style ={styles.work}>
        Please use your LISD username and password
        </Text>   
      <TextInput
        label="Username"
        value={ username}
        onChangeText={setUsername}
        style={styles.input} 
        secureTextEntry={false}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 60,
    alignItems: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    minWidth: 200,
    backgroundColor: '#bfe1ff'
  },
  button: {
    marginTop: 16,
    backgroundColor:'#3495eb',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  logo: {
    height: 100,
    width: 250,
    marginTop: 5,
    alignSelf: "center",
    marginBottom: 30,
  },
  work: {
  fontSize: 18,
  alignSelf: "center",
  textAlign: "center",
  marginTop: -16,
  marginBottom: 18,
  }
});

export default Login;