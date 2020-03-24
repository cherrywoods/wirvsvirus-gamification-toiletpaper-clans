import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';

import FirebaseModel from '_utilities/FirebaseModel';

import SignUpView from './view';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const doSignup = () => {
    if (password !== confirmPassword) {
      // TODO
      return;
    }
    setIsLoading(true);
    auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          FirebaseModel.instance().loginAsUser(user.uid);
          navigation.navigate('Onboarding');
        }
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SignUpView
      isLoading={isLoading}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onChangeConfirmPassword={setConfirmPassword}
      onPressHome={() => navigation.navigate('Home')}
      onPressSignUp={doSignup}
      onPressLogin={() => navigation.navigate('Login')}
    />
  );
};

export default SignUpScreen;
