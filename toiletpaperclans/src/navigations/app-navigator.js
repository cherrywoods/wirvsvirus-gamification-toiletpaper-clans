import { createStackNavigator } from 'react-navigation-stack';

import MyTeamScreen from '_scenes/MyTeam';

const AppNavigator = createStackNavigator({
  MyTeam: {
    screen: MyTeamScreen,
    navigationOptions: {
      title: 'My Team',
      headerShown: false,
    },
  },
}, {
  initialRouteName: 'MyTeam',
  headerShown: false,
  headerMode: 'none',
});

export default AppNavigator;
