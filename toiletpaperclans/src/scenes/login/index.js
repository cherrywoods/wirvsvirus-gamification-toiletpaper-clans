import React from 'react';

import LoginView from './view';

const LoginScreen = ({ navigation }) => {
  // Logic here!
  return (
    <LoginView
      onPressHome={() => navigation.navigate('Home')}
      onPressContinue={() => navigation.navigate('MyTeam')}
      onPressSignUp={() => navigation.navigate('SignUp')}
    />
  );
};

export default LoginScreen;