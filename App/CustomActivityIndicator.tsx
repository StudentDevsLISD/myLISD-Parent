import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CustomActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#005987" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
});

export default CustomActivityIndicator;
