import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setNewsDetails} from '../redux/actions/detailaction';
import {PLACEHOLDER} from '../utils/constants';

const NewsDetail = () => {
  const {news} = useSelector(state => state.detailReducer);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'column'}}>
      <Image
        source={{
          uri: news.urlToImage ? news.urlToImage : PLACEHOLDER,
        }}
        style={{
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          height: 340,
          width: '100%',
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 21,
            lineHeight: 30,
            color: 'white',
            fontWeight: '400',
            flexWrap: 'wrap',
          }}>
          {news.title ? news.title : ''}
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            fontWeight: '200',
            lineHeight: 30,
            marginTop: 10,
            flexWrap: 'wrap',
          }}>
          {news.content ? news.content : ''}
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            fontWeight: '100',
            lineHeight: 30,
            marginTop: 10,
            flexWrap: 'wrap',
          }}>
          {'Source: '}
          {news.source ? news.source.name : ''}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(news.url);
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'grey',
              fontWeight: '300',
              lineHeight: 30,
              marginTop: 10,
              flexWrap: 'wrap',
            }}>
            {'Click here to read more'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default NewsDetail;
