import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { HandleLogout } from './AppRunner';

type Props = {
  handleLogout: HandleLogout;
  handleHACLogout: any;
};

const SettingsScreen: React.FC<Props> = ({ handleLogout, handleHACLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogoutPress = async () => {
    await handleLogout(navigation);
  };
  const handleHACLogoutPress = async () => {
    await handleHACLogout(navigation);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleHACLogoutPress}>
        <Icon name="sign-out" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Log Out of HAC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  darkModeContainer: {
    backgroundColor: '#222',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkModeText: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsScreen;
