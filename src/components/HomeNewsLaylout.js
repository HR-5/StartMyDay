import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
} from 'react-native';
import HomeNewsCard from './HomeNewsCard';
import {API_KEY} from '../utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import {setCat, resetNews} from '../redux/actions/listnewsactions';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

const HomeNewsLaylout = ({cat = 'general', navigation}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const storeData = async news => {
    try {
      var n = JSON.stringify({oldnews: news});
      await AsyncStorage.setItem(cat, n);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem(cat);
      if (value) {
        value = JSON.parse(value);
        setNews(value.oldnews);
      }
      return;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return;
  };

  const getArticlesFromApi = async () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setLoading(true);
        const url =
          'https://newsapi.org/v2/top-headlines?category=' +
          cat +
          '&pageSize=5&apiKey=' +
          API_KEY;
        let response = await fetch(url);
        var json = await response.json();
        var newss = json.articles;
        setNews(newss);
        storeData(newss);
        setLoading(false);
      } else {
        retrieveData();
      }
    });
  };

  const listPage = () => {
    dispatch(setCat(cat));
    dispatch(resetNews());
    navigation.navigate('List');
  };

  useEffect(() => {
    getArticlesFromApi();
  }, []);

  return (
    <View style={{height: 200, marginTop: 20, flexDirection: 'row'}}>
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator color="red" size={45} />
        </View>
      ) : (
        <>
          {news.length === 0 ? (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>No data available</Text>
            </View>
          ) : (
            <FlatList
              data={news}
              style={{flex: 1, width: '100%'}}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
              renderItem={({item}) => {
                return (
                  <HomeNewsCard
                    title={item.title}
                    img={item.urlToImage}
                    news={item}
                    navigation={navigation}
                  />
                );
              }}
              horizontal={true}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    onPress={() => listPage()}
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flex: 1,
                    }}>
                    <Text style={styles.footer}>View More</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 17,
  },
});

export default HomeNewsLaylout;
