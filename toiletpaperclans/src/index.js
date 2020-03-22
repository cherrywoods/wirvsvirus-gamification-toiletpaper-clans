import React, { useEffect } from 'react';
import Navigator from '_navigations';
import FirebaseModel from '_utilities/FirebaseModel';

// TODO: for testing
FirebaseModel.instance().on('leaderboard', b => console.log("board", b));

const App = () => {
  return (
    <Navigator />
  );
};

export default App;
