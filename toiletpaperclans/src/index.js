import React from 'react';
import Navigator from '_navigations';
import * as db from '_utilities/database.js';

db.initFirebase();
const App = () => <Navigator />;

export default App;