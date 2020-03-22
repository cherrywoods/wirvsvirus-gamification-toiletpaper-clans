import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';

import FirebaseModel from '_utilities/FirebaseModel';

import LoginView from './view';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const doLogin = () => {
    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          FirebaseModel.instance().loginAsUser(user.uid);
          navigation.navigate('App');
        }
      })
      .catch(() => {
        console.log('error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoginView
      isLoading={isLoading}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onPressLogin={doLogin}
      onPressHome={() => navigation.navigate('Home')}
      onPressSignUp={() => navigation.navigate('SignUp')}
    />
  );
};

export default LoginScreen;
