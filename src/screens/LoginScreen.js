import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import lot from '../assets/lottie.json';
import news from '../assets/news1.json';
import {TextInput} from 'react-native-paper';
import * as colors from '../assets/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setName} from '../redux/actions/actions';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const animationRef = useRef();
  const [username, setUsername] = useState('');

  useEffect(() => {
    animationRef.current?.play(45, 1000);
    dispatch(setName(''));
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('User', JSON.stringify({username: username}));
    } catch (error) {
      // Error saving data
    }
  };

  const login = () => {
    if (!username || username === '') {
      Alert.alert('Invalid Username', 'Enter Valid Username', [{text: 'OK'}]);
      return;
    }
    if (pass === 'pass') {
      storeData();
      dispatch(setName(username));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      Alert.alert('Wrong Credential', 'Enter Valid Username & Password', [
        {text: 'OK'},
      ]);
      return;
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        padding: '7%',
      }}>
      <LottieView
        ref={animationRef}
        style={{
          height: 400,
          alignSelf: 'center',
          flex: 1,
          padding: '3%',
        }}
        source={news}
        progress={1}
        loop
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.heading}>Let's sign you in</Text>
        <Text style={styles.subHeading}>
          Welcome back,{'\n'}You've been missed!
        </Text>
        <TextInput
          placeholder="Enter your username"
          mode="outlined"
          style={{backgroundColor: 'black'}}
          theme={{
            colors: {
              primary: 'white',
            },
          }}
          outlineColor={colors.grey}
          textColor="white"
          onChangeText={username => {
            setUsername(username);
          }}
        />
        <TextInput
          placeholder="Enter your password"
          mode="outlined"
          autoCapitalize="none"
          style={{backgroundColor: 'black', marginTop: 10}}
          theme={{
            colors: {
              primary: 'white',
            },
          }}
          onChangeText={text => setPass(text)}
          outlineColor={colors.grey}
          textColor="white"
        />
        <TouchableOpacity onPress={() => login()}>
          <View style={styles.loginButton}>
            <Text style={styles.login}>Sign in</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 20,
    borderRadius: 10,
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 25,
    color: colors.grey,
    lineHeight: 34,
  },
  login: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
