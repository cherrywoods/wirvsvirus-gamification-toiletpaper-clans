import React, { useState, useEffect } from 'react';

import FirebaseModel from '_utilities/FirebaseModel';

import MyTeamView from './view';

import auth from '@react-native-firebase/auth';

const firebaseData = FirebaseModel.instance();
const MyTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState(firebaseData.teamName);
  const [toiletpaperScore, setToiletpaperScore] = useState(firebaseData.teamToiletpaper);
  const [disinfectantScore, setDisinfectantScore] = useState(firebaseData.teamDisinfectant);
  const [teamMembers, setTeamMembers] = useState(firebaseData.teamMembers);

  useEffect(() => {
    firebaseData.on('teamName', setTeamName);
    firebaseData.on('teamToiletpaper', setToiletpaperScore);
    firebaseData.on('teamDisinfectant', setDisinfectantScore);
    firebaseData.on('teamMembers', setTeamMembers);
    return () => {
      firebaseData.off('teamName', setTeamName);
      firebaseData.off('teamToiletpaper', setToiletpaperScore);
      firebaseData.off('teamDisinfectant', setDisinfectantScore);
      firebaseData.off('teamMembers', setTeamMembers);
    };
  }, []);

  const doLogout = () => {
    auth().signOut();
    navigation.navigate('Auth');
  };

  return (
    <MyTeamView
      teamName={teamName}
      toiletpaperScore={toiletpaperScore}
      disinfectantScore={disinfectantScore}
      teamMembers={teamMembers}
      onPressLogout={doLogout}
    />
  );
};

export default MyTeamScreen;
