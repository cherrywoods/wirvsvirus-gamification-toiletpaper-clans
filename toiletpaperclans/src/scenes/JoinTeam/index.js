import React from 'react';

const JoinTeamScreen = ({ navigation }) => {
  return (
    <JoinTeamView
      onPressHome={() => navigation.navigate('Home')}
    />
  )
};

export default JoinTeamScreen;
