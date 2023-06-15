import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const GoogleFeedback = () => {
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
  return (
    <WebView
      source={{ uri: 'https://www.k12insight.com/chatbot/chatbot/OpenChatWindow?strMainCorpno=WKXY9FLT&projectId=lt-leander-live-ef9d&LtTabKey=WKXY9FLT&isLtTab=true&LtTabColor=2c3638@e9f4ff' }}
      style={{ flex: 1 }}
    />
  );
};


export default GoogleFeedback;