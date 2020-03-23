import { createStackNavigator } from 'react-navigation-stack';

import OnboardingChallengeUsernameScreen from '_scenes/OnboardingChallengeUsername';
import OnboardingChallengeTeamScreen from '_scenes/OnboardingChallengeTeam';

export default createStackNavigator({
  OnboardingChallengeUsername: OnboardingChallengeUsernameScreen,
  OnboardingChallengeTeam: OnboardingChallengeTeamScreen,
}, {
  initialRouteName: 'OnboardingChallengeUsername',
  header: null,
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});
