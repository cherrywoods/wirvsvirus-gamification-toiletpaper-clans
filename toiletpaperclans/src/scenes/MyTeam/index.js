import React, { useState, useEffect } from 'react';

import FirebaseModel from '_utilities/FirebaseModel';

import MyTeamView from './view';

const firebaseData = FirebaseModel.instance();
const MyTeamScreen = () => {
  const [teamName, setTeamName] = useState(firebaseData.teamName);
  const [toiletpaperScore, setToiletpaperScore] = useState(firebaseData.teamToiletpaper);
  const [disinfectantScore, setDisinfectantScore] = useState(firebaseData.teamDisinfectant);
  const [teamMembers, setTeamMembers] = useState(firebaseData.teamMembers);
  const [leaderboard, setLeaderboard] = useState(firebaseData.leaderboard);

  useEffect(() => {
    firebaseData.on('teamName', setTeamName);
    firebaseData.on('teamToiletpaper', setToiletpaperScore);
    firebaseData.on('teamDisinfectant', setDisinfectantScore);
    firebaseData.on('teamMembers', setTeamMembers);
    firebaseData.on('leaderboard', setLeaderboard);
    return () => {
      firebaseData.off('teamName', setTeamName);
      firebaseData.off('teamToiletpaper', setToiletpaperScore);
      firebaseData.off('teamDisinfectant', setDisinfectantScore);
      firebaseData.off('teamMembers', setTeamMembers);
      firebaseData.off('leaderboard', setLeaderboard);
    };
  }, []);

  return (
    <MyTeamView
      teamName={teamName}
      toiletpaperScore={toiletpaperScore}
      disinfectantScore={disinfectantScore}
      teamMembers={teamMembers}
      leaderboard={leaderboard}
    />
  );
};

export default MyTeamScreen;
