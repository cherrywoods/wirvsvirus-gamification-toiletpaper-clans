import { createStackNavigator } from 'react-navigation-stack';

import MyTeamScreen from '_scenes/MyTeam';
import TeamSettingsScreen from '_scenes/TeamSettings'

const AppNavigator = createStackNavigator({
  MyTeam: {
    screen: MyTeamScreen,
    navigationOptions: {
      title: 'My Team',
      headerShown: false,
    },
  },
  TeamSettings: {
    screen: TeamSettingsScreen,
    navigationOptions: {
      title: 'Team Settings',
      headerShown: false,
    }
  }
}, {
  initialRouteName: 'MyTeam',
  headerShown: false,
  headerMode: 'none',
});

export default AppNavigator;
