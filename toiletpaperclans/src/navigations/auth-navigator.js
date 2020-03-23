import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import LoginScreen from '_scenes/Login';

import SignUpNavigator from './signup-navigator';

const AuthNavigator = createAnimatedSwitchNavigator({
  Login: LoginScreen,
  SignUp: SignUpNavigator,
}, {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
});

export default AuthNavigator;
