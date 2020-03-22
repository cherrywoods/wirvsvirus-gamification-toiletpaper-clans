import React, { useState, useEffect } from 'react';

import FirebaseModel from '_utilities/FirebaseModel';

import MyTeamView from './view';

const firebaseData = FirebaseModel.instance();
const MyTeamScreen = () => {
  const [teamName, setTeamName] = useState(firebaseData.teamName);
  const [toiletpaperScore, setToiletpaperScore] = useState(firebaseData.teamToiletpaper);
  const [disinfectantScore, setDisinfectantScore] = useState(firebaseData.teamDisinfectant);

  useEffect(() => {
    firebaseData.on('teamName', setTeamName);
    firebaseData.on('teamToiletpaper', setToiletpaperScore);
    firebaseData.on('teamDisinfectant', setDisinfectantScore);
    return () => {
      firebaseData.off('teamName', setTeamName);
      firebaseData.off('teamToiletpaper', setToiletpaperScore);
      firebaseData.off('teamDisinfectant', setDisinfectantScore);
    };
  }, []);

  return (
    <MyTeamView
      teamName={teamName}
      toiletpaperScore={toiletpaperScore}
      disinfectantScore={disinfectantScore}
    />
  );
};

export default MyTeamScreen;
