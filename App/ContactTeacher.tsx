import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';

interface Teacher {
  name: string;
  class: string;
  email: string;
  imageUrl: string;
}

const teachers: Teacher[] = [
  {
    name: "John Doe",
    class: "AP Calculus BC",
    email: "adith.chandraiah@gmail.com",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5b56c01f9f877051fa238ca3/1573759915619-1LGAQ3NCIULHNEZ1OY87/Ray.jpg",
  },
  {
    name: "Jane Smith",
    class: "AP English Language and Composition",
    email: "janesmith@example.com",
    imageUrl: "https://media.istockphoto.com/id/1151796047/photo/laughing-mature-businesswoman-wearing-glasses-posing-on-grey-studio-background.jpg?s=612x612&w=0&k=20&c=Nkb3aDxmf2g_-zFqq0j97x8J_V9asEq5XUpPJU4wxLc=",
  },
  // Add more teachers here
];

const ItemView = ({ item }: { item: Teacher }) => {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${item.email}`);
  };

  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <TouchableOpacity style={styles.ContactTeacherArticleContainer} onPress={handleEmailPress}>
      <Image source={{ uri: item.imageUrl }} style={styles.ContactTeacherImage} resizeMode="contain" />
      <View style={styles.ContactTeacherTextContainer}>
        <Text style={styles.ContactTeacherTitle}>{item.name}</Text>
        <Text style={styles.ContactTeacherSource}>{item.class}</Text>
      </View>
      <Icon name="chevron-right" size={30} color="gray" />
    </TouchableOpacity>
  );
};

const ItemSeparatorView = () => {
  return (
    // FlatList Item Separator
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
  );
};

const ContactTeachersScreen = () => {
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


  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.ContactTeacherContainer}>
      <Text style={styles.ContactTeacherSectionTitle}>Contact Teachers</Text>
      <FlatList
        data={teachers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};


export default ContactTeachersScreen;
