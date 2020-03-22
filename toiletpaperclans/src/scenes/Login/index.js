import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';

import LoginView from './view';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('App');
      })
      .catch(() => {
        console.log('error');
      });
  };

  return (
    <LoginView
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onPressLogin={doLogin}
      onPressHome={() => navigation.navigate('Home')}
      onPressSignUp={() => navigation.navigate('SignUp')}
    />
  );
};

export default LoginScreen;
