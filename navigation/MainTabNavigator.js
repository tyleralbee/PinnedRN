import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DropPinScreen from '../screens/DropPinScreen';
import FriendsScreen from '../screens/FriendsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const DropPinStack = createStackNavigator(
  {
    DropPin: DropPinScreen,
  },
  config
);

DropPinStack.navigationOptions = {
  tabBarLabel: 'Drop Pin',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} />
  ),
};

DropPinStack.path = '';

const FriendsStack = createStackNavigator(
  {
    Friends: FriendsScreen,
  },
  config
);

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};

FriendsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  DropPinStack,
  FriendsStack,
});

tabNavigator.path = '';

export default tabNavigator;
