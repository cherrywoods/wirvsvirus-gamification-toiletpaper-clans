import React from 'react';

import ChooseAvatarView from './view';

const ChooseAvatarScreen = ({ navigation }) => {
  // Logic here!
  return (
    <ChooseAvatarView
      onPressHome={() => navigation.navigate('Home')}
    />
  );
};

export default ChooseAvatarScreen;
