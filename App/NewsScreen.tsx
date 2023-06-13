import React from 'react';
import { View, FlatList, Text, Linking, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Article {
  title: string;
  url: string;
  source: string;
  imageUrl: string;
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

const ItemView = ({ item }: { item: Article }) => {
  return (
    <TouchableOpacity style={styles.articleContainer} onPress={() => Linking.openURL(item.url)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.source}>{item.source}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={30} color="gray" />
    </TouchableOpacity>
  );
};


const ItemSeparatorView = () => {
  return (
    // FlatList Item Separator
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top Stories</Text>
      <FlatList
        data={newsArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 5,
    color: "#005987",
  },
  articleContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,

  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  source: {
    fontSize: 14,
    color: 'grey',
  },
});

export default Home;
