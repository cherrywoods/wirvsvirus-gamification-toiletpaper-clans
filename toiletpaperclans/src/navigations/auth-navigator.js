import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/Login';
import SignUpScreen from '_scenes/SignUp';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Login: LoginScreen,
  SignUp: SignUpScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;