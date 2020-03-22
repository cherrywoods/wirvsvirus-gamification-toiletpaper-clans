import { createStackNavigator } from 'react-navigation-stack';

import MyTeamScreen from '_scenes/MyTeam';

const AppNavigator = createStackNavigator({
  MyTeam: {
    screen: MyTeamScreen,
    navigationOptions: {
      title: 'My Team',
      header: null,
    },
  },
}, {
  initialRouteName: 'MyTeam',
  header: null,
  headerMode: 'none',
});

export default AppNavigator;
