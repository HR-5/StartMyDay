import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-paper';
import HomeNewsLaylout from '../components/HomeNewsLaylout';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setName} from '../redux/actions/actions';

const HomePage = ({navigation}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  const retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('User');
      if (value !== null && value.username !== '') {
        setName(value.username);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
    return;
  };

  useEffect(() => {
    retrieveData().then(() => dispatch(setName(value.username)));
    return;
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'black',
          flexDirection: 'column',
          padding: '5%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Top Headlines</Text>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <Image
              resizeMode={'cover'}
              source={require('../assets/arrow.png')}
              style={{
                borderRadius: 10,
                height: 20,
                width: 20,
                overflow: 'hidden',
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>General</Text>
        <HomeNewsLaylout cat="general" navigation={navigation} />
        <Text style={styles.subtitle}>Business</Text>
        <HomeNewsLaylout cat="Business" navigation={navigation} />
        <Text style={styles.subtitle}>Entertainment</Text>
        <HomeNewsLaylout cat="Entertainment" navigation={navigation} />
        <Text style={styles.subtitle}>Health</Text>
        <HomeNewsLaylout cat="Health" navigation={navigation} />
        <Text style={styles.subtitle}>Science</Text>
        <HomeNewsLaylout cat="Science" navigation={navigation} />
        <Text style={styles.subtitle}>Sports</Text>
        <HomeNewsLaylout cat="Sports" navigation={navigation} />
        <Text style={styles.subtitle}>Technology</Text>
        <HomeNewsLaylout cat="Technology" navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    flex: 1,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default HomePage;
