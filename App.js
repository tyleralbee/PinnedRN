import React, { useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import DropPinScreen from './screens/DropPinScreen';
import SignInScreen from './screens/SignInScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store } from './store';
import ProfileScreen from './screens/ProfileScreen';
import ViewPinScreen from './screens/ViewPinScreen';

EStyleSheet.build({ $textColor: '#0275d8' });

const Stack = createStackNavigator();
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([]),
    Font.loadAsync({
      ...Ionicons.font,
      'fira-regular': require('./assets/fonts/FiraSans-Regular.ttf'),
      'fira-bold': require('./assets/fonts/FiraSans-Bold.ttf'),
      'fira-light': require('./assets/fonts/FiraSans-Light.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // Implement Sentry here
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="DropPin" component={DropPinScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="ViewPin" component={ViewPinScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>

    );
  }
}

