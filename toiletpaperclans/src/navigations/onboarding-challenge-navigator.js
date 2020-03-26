import { createStackNavigator } from 'react-navigation-stack';

import OnboardingChallengeUsernameScreen from '_scenes/OnboardingChallengeUsername';
import OnboardingChallengeTeamScreen from '_scenes/OnboardingChallengeTeam';
import JoinTeamScreen from '_scenes/JoinTeam'

export default createStackNavigator({
  OnboardingChallengeUsername: OnboardingChallengeUsernameScreen,
  OnboardingChallengeTeam: OnboardingChallengeTeamScreen,
  JoinTeam: JoinTeamScreen
}, {
  initialRouteName: 'OnboardingChallengeUsername',
  headerShown: false,
  headerMode: 'none',
  navigationOptions: {
    gestureEnabled: false,
  },
});
