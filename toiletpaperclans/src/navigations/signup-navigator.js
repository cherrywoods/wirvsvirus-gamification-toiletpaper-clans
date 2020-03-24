import { createStackNavigator } from 'react-navigation-stack';

import SignUpScreen from '_scenes/SignUp';
import OnboardingScreen from '_scenes/Onboarding';

import OnboardingChallengeNavigator from './onboarding-challenge-navigator';

export default createStackNavigator({
  SignUp: SignUpScreen,
  Onboarding: OnboardingScreen,
  OnboardingChallenge: OnboardingChallengeNavigator,
}, {
  headerShown: false,
  headerMode: 'none',
});
