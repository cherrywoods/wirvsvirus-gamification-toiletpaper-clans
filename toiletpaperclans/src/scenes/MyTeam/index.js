import React, { useState, useEffect } from 'react';

import useDropProgress from './hooks/use-drop-progress.js';
import FirebaseModel from '_utilities/FirebaseModel';

import MyTeamView from './view';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const firebaseData = FirebaseModel.instance();
const MyTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState(firebaseData.teamName);
  const [toiletpaperScore, setToiletpaperScore] = useState(firebaseData.teamToiletpaper);
  const [disinfectantScore, setDisinfectantScore] = useState(firebaseData.teamDisinfectant);
  const [teamMembers, setTeamMembers] = useState(firebaseData.teamMembers);
  const [leaderboard, setLeaderboard] = useState(firebaseData.leaderboard);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const { toiletpaperProgress, disinfectantProgress, toiletpaperTime, disinfectantTime } = useDropProgress();

  const onSelectSlide = (index, ref) => {
    if (ref.current.state.index === 1 && index === 0) {
      ref.current.scrollBy(-1);
    } else if (ref.current.state.index === 0 && index === 1) {
      ref.current.scrollBy(1);
    } else {
      return;
    }
    setCurrentSlide(index);
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

  const doNavigation = () => {
    const { uid } = auth().currentUser
    database().ref('/User/' + uid + '/').once('value').then(snapshot => {
      const teamId = (snapshot.val() && snapshot.val().team)
      if (teamId === '') {
        navigation.navigate('JoinTeam')
      } else {
        navigation.navigate('TeamSettings')
      }
    })
    
  }

  return (
    <MyTeamView
      teamName={teamName}
      toiletpaperScore={toiletpaperScore}
      disinfectantScore={disinfectantScore}
      toiletpaperProgress={toiletpaperProgress}
      disinfectantProgress={disinfectantProgress}
      toiletpaperTime={toiletpaperTime}
      disinfectantTime={disinfectantTime}
      teamMembers={teamMembers}
      leaderboard={leaderboard}
      currentSlide={currentSlide}
      isAddModalVisible={isAddModalVisible}
      onToggleAddModal={setIsAddModalVisible}
      onSelectSlide={onSelectSlide}
      onChangeCurrentSlide={setCurrentSlide}
      onPressLogout={doLogout}
      onPressSettings={doNavigation}
    />
  );
};



export default MyTeamScreen;
