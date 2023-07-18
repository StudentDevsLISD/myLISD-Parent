import React, { useContext, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { HandleLogout } from './AppRunner';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

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

  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={[styles.SettingsContainer, isDarkMode && styles.SettingsDarkModeContainer]}>
      <View style={styles.SettingsSettingRow}>
        <Text style={[styles.SettingsSettingText, isDarkMode && styles.SettingsDarkModeText]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity style={styles.SettingsLogoutButton} onPress={handleHACLogoutPress}>
        <Icon name="sign-out" size={24} color="#fff" />
        <Text style={styles.SettingsLogoutButtonText}>Log Out of HAC</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
