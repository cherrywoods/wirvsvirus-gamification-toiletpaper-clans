import React, { useState, useEffect } from 'react';

import database from '@react-native-firebase/database';

import useDebounce from '_hooks/use-debounce';
import FirebaseModel from '_utilities/FirebaseModel';

import OnboardingChallengeUsernameView from './view';

const OnboardingChallengeUsernameScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isLoadingValidation, setIsLoadingValidation] = useState(false);

  useEffect(() => {
    setIsLoadingValidation(true);
    setIsUsernameValid(false);
  }, [username]);

  const debouncedUsername = useDebounce(username, 1000);
  useEffect(() => {
    if (debouncedUsername && debouncedUsername.length > 2) {
      database().ref('User').orderByChild('username').equalTo(debouncedUsername).once('value')
        .then(data => setIsUsernameValid(!data.exists()))
        .catch(() => setIsUsernameValid(false))
        .finally(() => setIsLoadingValidation(false));
    }
  }, [debouncedUsername]);

  const doContinue = () => {
    navigation.navigate('OnboardingChallengeTeam', { username });
  };

  return (
    <OnboardingChallengeUsernameView
      username={username}
      isLoadingValidation={isLoadingValidation}
      isUsernameValid={isUsernameValid}
      onChangeUsername={setUsername}
      onPressContinue={doContinue}
    />
  );
};

export default OnboardingChallengeUsernameScreen;
