import React from 'react';

import SignUpView from './view';

const SignUpScreen = ({ navigation }) => {
  return (
    <SignUpView
      onPressHome={() => navigation.navigate('Home')}
    />
  );
};

export default SignUpScreen;
