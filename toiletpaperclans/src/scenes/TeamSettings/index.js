import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


import TeamSettingsView from './view';

const TeamSettingsScreen = ({ navigation }) => {
  const [newTeamname, setNewTeamname] = useState('');
  const [playerID, setPlayerID] = useState('');

  const changeTeamname = () => {

    const { uid } = auth().currentUser;
    const userRef = database().ref('User').child(uid);
    Promise.all([
      userRef.child('team').once('value').then(
        team => database().ref('Team').child(team.val()).update({ newTeamname })
      ),
    ])
      .catch((error) => console.log('error', error))

  }

  const invitePlayer = () => {
    const emptyName = ''
    const { uid } = auth().currentUser;
    const userRef = database().ref('User').child(uid);
    Promise.all([
      userRef.child('team').once('value').then(
        team => database().ref('Team').child(team.val()).update({ emptyName })
      ),
    ])
    .then(console.log('sucess'))
    .catch(error => {console.log('error', error)})
    .finally(console.log('finally'))

  }

  const leaveTeam = () => {
    const { uid } = auth().currentUser
    database().ref('/User/' + uid + '/').once('value').then(snapshot => {
      const teamId = (snapshot.val() && snapshot.val().team)
      console.log(teamId)

      database().ref('Team/' + teamId + '/members/').once('value', (snapshot) => {
          
        const memberIds = snapshot.val();
        console.log(memberIds)
        let newMember = []
        // dont works: memberIds.fliter(id => {return id !== uid} )
        memberIds.forEach(id => {
          if (id !== uid) {
            newMember.push(id)
          }
        })
        console.log(newMember)
          //console.log(newMembers)
          // database().ref('Team/' + teamId + '/members/').set(
          //   [uid],
          //   function(error) {
          //     if (error) {
          //       // The write failed...
          //       console.log('error')
          //     } else {
          //       // Data saved successfully!
          //       console.log('sucess')
          //     }
          // });



        // const memberCallback = (_snapshot) => {
        //   var value = _snapshot.val();
        //   value.atHome = value.lastStatus === value.lastAtHomeTime;
        //   const newMembers = new Map(this.teamMembers);
        //   newMembers.set(_snapshot.key, value);
        //   this.trigger('teamMembers', newMembers);
        // };
      //console.log(snapshot.val())
      })
    })

    database().ref('/Team/-M322t5b_NvZoYseg-uu/').on('value', snapshot => {
      //console.log(snapshot.val())
    })
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

  const getTeamname = () => {
    return ""
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
    />
  );
};

export default TeamSettingsScreen;