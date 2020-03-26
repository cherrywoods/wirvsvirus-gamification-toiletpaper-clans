import React, { useState } from "react";


const JoinTeamScreen = ({ navigation }) => {
  const [teamname, setTeamname] = useState('')
  return (
    <JoinTeamView
      onPressHome={() => navigation.navigate('App')}
      onChangeTeamname={setTeamname}
      teamname={teamname}
    />
  );
};

export default JoinTeamScreen;
