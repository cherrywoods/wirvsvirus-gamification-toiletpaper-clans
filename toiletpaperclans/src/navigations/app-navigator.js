import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MyTeamScreen from '_scenes/myteam';

const TabNavigatorConfig = {
  initialRouteName: 'MyTeam',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  MyTeam: {
    screen: MyTeamScreen,
    navigationOptions: {
      title: 'My Team',
      header: null,
    },
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
