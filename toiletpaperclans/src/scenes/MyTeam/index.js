import React, { useState, useEffect } from 'react';

import useDropProgress from './hooks/use-drop-progress.js';
import FirebaseModel from '_utilities/FirebaseModel';

import MyTeamView from './view';

import auth from '@react-native-firebase/auth';

const firebaseData = FirebaseModel.instance();
const MyTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState(firebaseData.teamName);
  const [toiletpaperScore, setToiletpaperScore] = useState(firebaseData.teamToiletpaper);
  const [disinfectantScore, setDisinfectantScore] = useState(firebaseData.teamDisinfectant);
  const [teamMembers, setTeamMembers] = useState(firebaseData.teamMembers);
  const [leaderboard, setLeaderboard] = useState(firebaseData.leaderboard);
  const [slide1, setSlide1] = useState('#B40E22');
  const [slide2, setSlide2] = useState('black');

  const { toiletpaperProgress, disinfectantProgress } = useDropProgress();

  const clickSliderButton = (ref) => {
    console.log(ref.current.state);
    if (ref.current.state.index === 1) {
      ref.current.scrollBy(-1);
      slideHasChanged(1);
    } else if (ref.current.state.index === 0) {
      ref.current.scrollBy(1);
      slideHasChanged(2);
    }
  };

  const slideHasChanged = (index) => {
    if (index === 0){
      setSlide1('#B40E22');
      setSlide2('black');
    } else if (index === 1){
      setSlide2('#B40E22');
      setSlide1('black');
    }
  };

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

  const doLogout = () => {
    FirebaseModel.instance().logout();
    auth().signOut();
    navigation.navigate('Auth');
  };

  return (
    <MyTeamView
      teamName={teamName}
      toiletpaperScore={toiletpaperScore}
      disinfectantScore={disinfectantScore}
      toiletpaperProgress={toiletpaperProgress}
      disinfectantProgress={disinfectantProgress}
      teamMembers={teamMembers}
      leaderboard={leaderboard}
      slide1={slide1}
      slide2={slide2}
      slideHasChanged={slideHasChanged}
      clickSliderButton={clickSliderButton}
      onPressLogout={doLogout}
    />
  );
};



export default MyTeamScreen;
