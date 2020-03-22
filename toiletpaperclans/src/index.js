import React from 'react';
import Navigator from '_navigations';
import FirebaseModel from '_utilities/FirebaseModel';

// TODO: for testing
FirebaseModel.instance().loginAsUser("-M2xiPYZuRgUzlWEa_q1");
FirebaseModel.instance().on('teamName', (name) => console.log(name));

const App = () => <Navigator />;

export default App;
