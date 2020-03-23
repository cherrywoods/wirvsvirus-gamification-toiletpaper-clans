import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import OnboardingChallengeTeamView from './view';

const OnboardingChallengeTeamScreen = ({ navigation, ...params }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const doContinue = () => {
    setIsLoading(true);

    const { uid } = auth().currentUser;
    const username = navigation.getParam('username');
    const userRef = database().ref('User').child(uid);
    Promise.all([
      userRef.update({ username }),
      userRef.child('team').once('value').then(
        team => database().ref('Team').child(team.val()).update({ name })
      ),
    ])
      .then(() => navigation.navigate('App'))
      .catch(() => console.log('error'))
      .finally(() => setIsLoading(false));
  };

  return (
    <OnboardingChallengeTeamView
      name={name}
      isLoading={isLoading}
      onChangeName={setName}
      onPressContinue={doContinue}
    />
  );
};

export default OnboardingChallengeTeamScreen;
