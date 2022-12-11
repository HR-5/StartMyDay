import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setNewsDetails} from '../redux/actions/detailaction';
import {PLACEHOLDER} from '../utils/constants';

const HomeNewsCard = ({title = '', img = '', news, navigation}) => {
  const dispatch = useDispatch();

  const newsDetail = () => {
    dispatch(setNewsDetails(news));
    navigation.navigate('Details');
  };
  return (
    <TouchableOpacity onPress={() => newsDetail()}>
      <Card style={{width: 200}}>
        <Image
          resizeMode={'cover'}
          source={{
            uri: img ? img : PLACEHOLDER,
          }}
          style={{
            borderRadius: 10,
            height: 200,
            width: 200,
            overflow: 'hidden',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 30,
              padding: 5,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default HomeNewsCard;
