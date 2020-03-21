import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

import MyTeamScreen from '_scenes/myteam';

const TabNavigatorConfig = {
  initialRouteName: 'MyTeam',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  MyTeam:{
    screen:MyTeamScreen,
    navigationOptions: {
      title: 'My Team',
      header: null,
    },
  }
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;