import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Provider} from 'react-redux';
import HomePage from './screens/HomePage';
import LoginScreen from './screens/LoginScreen';
import NewsDetail from './screens/NewsDetail';
import NewsList from './screens/NewsList';
import {Store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Screen = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="List" component={NewsList} />
          <Stack.Screen name="Details" component={NewsDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Screen;
