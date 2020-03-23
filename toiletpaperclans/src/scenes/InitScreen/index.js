import React, { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';

import FirebaseModel from '_utilities/FirebaseModel';

import InitView from './view';

const InitScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber; // Unsubscribe on unmount
  }, []);
  useEffect(() => {
    if (initializing) {
      setInitializing(false);
      return;
    }
    if (user) {
      FirebaseModel.instance().loginAsUser(user.uid);
    }
    navigation.navigate(user ? 'App' : 'Auth');
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InitView />
  );
};

export default InitScreen;
