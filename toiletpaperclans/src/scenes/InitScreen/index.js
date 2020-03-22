import React, { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';

import InitView from './view';

const InitScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber; // unsubscribe on unmount
  }, []);
  useEffect(() => {
    if (user) {
      if (initializing) {
        setInitializing(false);
      }
    }
    navigation.navigate(user ? 'App' : 'Auth');
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InitView />
  );
};

export default InitScreen;
