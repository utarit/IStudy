import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base'

import TimerScreen from '../screens/TimerScreen';
import StudyGroupScreen from '../screens/StudyGroupScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TimerStack = createStackNavigator({
  Home: TimerScreen,
});

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: ({ focused }) => (
    <Icon type="MaterialCommunityIcons" name="timer" focused={focused} />
  ),
};

// const StudyGroupStack = createStackNavigator({
//   Home: StudyGroupScreen,
// })

// StudyGroupStack.navigationOptions = {
//   tabBarLabel: 'Study Group',
//   tabBarIcon: ({focused}) => (
//       <Icon type="MaterialCommunityIcons" name="account-group" focused={focused} />
//   )
// }

const ProfileStack = createStackNavigator({
  Home: ProfileScreen,

})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
      <Icon type="MaterialCommunityIcons" name="face" focused={focused} />
  )
}


export default createBottomTabNavigator({
  TimerStack,
  // StudyGroupStack,
  ProfileStack
});