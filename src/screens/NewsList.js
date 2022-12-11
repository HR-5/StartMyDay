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
import {ActivityIndicator} from 'react-native-paper';
import HomeNewsCard from '../components/HomeNewsCard';
import ListNewsCard from '../components/ListNewsCard';
import {useSelector, useDispatch} from 'react-redux';
import {
  setNews,
  setLoading,
  setMoreLoading,
  setNextpage,
} from '../redux/actions/listnewsactions';
import {getNews} from '../api/GetNews';
import NetInfo from '@react-native-community/netinfo';

import {API_KEY} from '../utils/constants';

const NewsList = ({navigation}) => {
  const {news} = useSelector(state => state.newsReducer);
  const {moreloading} = useSelector(state => state.newsReducer);
  const {loading} = useSelector(state => state.newsReducer);
  const {page} = useSelector(state => state.newsReducer);
  const {category} = useSelector(state => state.newsReducer);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(true);

  const loadMore = () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        dispatch(setMoreLoading(true));
        dispatch(setNextpage(page + 1));
        getNews(page + 1, dispatch, category);
      }
    });
  };

  const storeData = async () => {
    try {
      if (!news || news.length === 0) return;
      var n = JSON.stringify({oldnews: news});
      var topic = category + 'List';
      await AsyncStorage.setItem(topic, n);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const retrieveData = async () => {
    try {
      var topic = category + 'List';
      console.log(topic);
      var value = await AsyncStorage.getItem(topic);
      console.log(value);
      if (value) {
        value = JSON.parse(value);
        dispatch(setNews(value.oldnews));
      }
      return;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    storeData();
  }, [news]);

  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        getNews(page, dispatch, category);
        dispatch(setLoading(true));
      } else {
        retrieveData();
      }
    });
  }, []);

  const cap = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text style={styles.title}>{cap(category) + ' News'}</Text>
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator color="red" size={45} />
        </View>
      ) : (
        <View style={{flex: 1, marginBottom: 20}}>
          {news.length === 0 ? (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>No data available</Text>
            </View>
          ) : (
            <FlatList
              data={news}
              style={{flex: 1, width: '100%'}}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
              renderItem={({item}) => {
                return (
                  <ListNewsCard
                    title={item ? item.title : ''}
                    img={item ? item.urlToImage : ''}
                    desc={item ? item.description : ''}
                    navigation={navigation}
                    news={item}
                  />
                );
              }}
              horizontal={false}
              onEndReached={() => loadMore()}
              onEndReachedThreshol={0.2}
            />
          )}
          {moreloading ? (
            <View style={{justifyContent: 'center', marginTop: 20}}>
              <ActivityIndicator color="red" size={20} />
            </View>
          ) : (
            <></>
          )}
        </View>
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
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default NewsList;
