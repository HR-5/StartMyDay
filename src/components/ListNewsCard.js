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

const ListNewsCard = ({title, img, desc, navigation, news}) => {
  const dispatch = useDispatch();
  const details = () => {
    dispatch(setNewsDetails(news));
    navigation.navigate('Details');
  };
  return (
    <TouchableOpacity onPress={() => details()}>
      <Card style={{margin: 10, height: 150}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode={'cover'}
            source={{
              uri: img ? img : PLACEHOLDER,
            }}
            style={{
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              height: 150,
              width: 150,
            }}
          />
          <View
            style={{
              padding: 10,
              justifyContent: 'space-evenly',
              flex: 1,
              backgroundColor: '#ffccba',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              numberOfLines={3}
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '700',
                flexWrap: 'wrap',
              }}>
              {title
                ? title
                : 'Garena Free Fire Max redeem codes December 10, 2022: Win free rewards | Mint - Mint'}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '400',
              }}>
              {desc
                ? desc
                : 'Garena Free Fire Max debuted in 2021. It is a revamped version of Garena Free Fire.'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ListNewsCard;
