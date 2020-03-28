import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FirebaseModel from '_utilities/FirebaseModel';


import TeamSettingsView from './view';

const TeamSettingsScreen = ({ navigation }) => {
  const [newTeamname, setNewTeamname] = useState('');
  const [playerID, setPlayerID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeTeamname = () => {
    // TODO
    setIsLoading(true)
    const { uid } = auth().currentUser;
    const userRef = database().ref('User').child(uid);
    Promise.all([
      userRef.child('team').once('value').then(
        team => database().ref('Team').child(team.val()).update({ newTeamname })
      ),
    ])
      .catch((error) => console.log('error', error))
      .finally(() => setIsLoading(false))

  }

  const invitePlayer = () => {

  }

  const leaveTeam = () => {
    const { uid } = auth().currentUser
    FirebaseModel.instance().removeFromTeam(uid)
    
  }

  const createTeam = () => {
    // TODO: leave Team
    //leaveTeam()
    
    const { uid } = auth().currentUser
    database().ref('/User/' + uid + '/').once('value').then(snapshot => {
      const username = snapshot.val().username
      //navigation.navigate('OnboardingChallengeTeam', { username })
    })
  }

  return (
    <TeamSettingsView
        teamname={getTeamname()}
        newTeamname={newTeamname}
        playerID={playerID}
        onChangeTeamname={setNewTeamname}
        onChangeInvitePlayer={setPlayerID}
        onPressChangeTeamname={changeTeamname}
        onPressInvitePlayer={invitePlayer}
        onPressCreateTeam={createTeam}
        onPressBack={() => navigation.navigate('MyTeam')}
        onPressLeaveTeam={leaveTeam}
        isLoading={isLoading}
    />
  );
};

export default TeamSettingsScreen;