import React from 'react';

import Header from '../Header';
import Pomodoro from '../Pomodoro';

import classes from './App.scss';

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <Pomodoro />
    </div>
  );
};

export default App;
