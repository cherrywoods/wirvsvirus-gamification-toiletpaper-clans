import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '_scenes/home';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home:{
    screen:HomeScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;