import React from 'react';
import { WebView } from 'react-native-webview';

const GoogleFeedback = () => {
  return (
    <WebView
      source={{ uri: 'https://forms.gle/5sm5X6vhA9zLLFFC6' }}
      style={{ flex: 1 }}
    />
  );
};

export default GoogleFeedback;