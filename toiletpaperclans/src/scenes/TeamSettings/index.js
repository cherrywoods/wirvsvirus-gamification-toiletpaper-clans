import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


import TeamSettingsScreen from './view';

const TeamSettingsScreen = ({ navigation }) => {
  const [newTeamname, setNewTeamname] = useState('');
  const [playerID, setPlayerID] = useState('');

  const changeTeamname = () => {
    setIsLoading(true);

    const { uid } = auth().currentUser;
    const userRef = database().ref('User').child(uid);
    Promise.all([
      userRef.child('team').once('value').then(
        team => database().ref('Team').child(team.val()).update({ name })
      ),
    ])
      .then(() => navigation.navigate('App'))
      .catch(() => console.log('error'))
      .finally(() => setIsLoading(false));

  }

  const invitePlayer = () => {

  }

  const createTeam = () => {
    // TODO: leave Team


    // navigate to create Team Screen
    // TODO: Add Username as Param
    navigation.navigate('OnboardingChallengeTeam')
  }

  return (
    <TeamSettingsScreen
        teamname = ""
        newTeamname={newTeamname}
        playerID={playerID}
        onChangeTeamname={setNewTeamname}
        onChangeInvitePlayer={setPlayerID}
        onPressChangeTeamname={changeTeamname}
        onPressInvitePlayer={invitePlayer}
        onPressCreateTeam={createTeam}
        onPressBack={() => navigation.navigate('App')}
    />
  );
};

export default TeamSettingsScreen;