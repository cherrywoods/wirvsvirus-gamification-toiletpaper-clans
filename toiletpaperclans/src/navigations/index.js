import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

import InitScreen from '_scenes/InitScreen';

const RootNavigator = createSwitchNavigator(
  {
    Init: InitScreen,
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Init',
  },
);

export default createAppContainer(RootNavigator);
