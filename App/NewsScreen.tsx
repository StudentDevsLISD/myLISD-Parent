import React, { useContext } from 'react';
import { View, FlatList, Text, Linking, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';
import Navigation from './Navigation';
import WebViewScreen from './WebViewScreen';
import { ThemeContext } from './ThemeContext';
import lightStyles from './LightStyles';
import darkStyles from './DarkStyles';


interface Article {
  title: string;
  url: string;
  source: string;
  imageUrl: string;
}

type RootStackParamList = {
  Home: undefined;
  NewsScreen: undefined;
  ContactTeachers: undefined;
  Details: { id: number };
  WebViewScreen: { url: string };
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
}
const newsArticles: Article[] = [
  {
    title: "Board Briefs: June 8, 2023",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/board-briefs-june-8-2023/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2022/09/Board-Briefs_1200x706.jpg",
  },
  {
    title: "2023-24 Academic Calendar Approved; 2024-25 Drafted",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/2023-24-academic-calendar-approved-2024-25-drafted/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2023/02/2023\u201324-Academic-Calendar-Approved.png",
  },
  {
    title: "Announcing Alison Pennington as Reagan Elementary School Principal",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/announcing-alison-pennington-as-reagan-elementary-school-principal/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2023/06/ReaganPrincipal_1200x641-1.png",
  },
  {
    title: "Announcing Shelley Roberts as Tarvin Elementary School Principal",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/announcing-shelley-roberts-as-tarvin-elementary-school-principal/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2023/06/Copy-of-Campus-Template_1200x641-1.png",
  },
  {
    title: "Announcing Chris Clark as Assistant Superintendent of Curriculum and Instruction",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/announcing-chris-clark-as-assistant-superintendent-of-curriculum-and-instruction/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2023/06/ChrisClark_1200x641-2.png",
  },
  {
    title: "The Compass: May 31, 2023",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/the-compass-may-31-2023/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2023/05/THE-COMPASS-May-31-2023.png",
  },
  {
    title: "Board Briefs: May 25, 2023",
    source: "Leander ISD News",
    url: "https://news.leanderisd.org/board-briefs-may-25-2023/",
    imageUrl: "https://news.leanderisd.org/wp-content/uploads/2022/09/Board-Briefs_1200x706.jpg",
  },
];

const ItemView = ({ item, navigation }: { item: Article, navigation: NavigationProp<RootStackParamList> }) => {
  
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'light' ? lightStyles : darkStyles;
  
  return (
    <TouchableOpacity style={styles.NewsScreenArticleContainer} onPress={() => 
    // Linking.openURL(item.url)
      navigation.dispatch(
        CommonActions.navigate({
          name: "WebViewScreen",
          params: { url: item.url }
        }
        )
        
      )
    }>
      <Image source={{ uri: item.imageUrl }} style={styles.NewsScreenImage} resizeMode="contain" />
      <View style={styles.NewsScreenTextContainer}>
        <Text style={styles.NewsScreenTitle}>{item.title}</Text>
        <Text style={styles.NewsScreenSource}>{item.source}</Text>
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
const NewsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  
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
    <View style={styles.NewsScreenContainer}>
      <Text style={styles.NewsScreenSectionTitle}>Top Stories</Text>
      <FlatList
        data={newsArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ItemView item={item} navigation={navigation}/>}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default NewsScreen;
