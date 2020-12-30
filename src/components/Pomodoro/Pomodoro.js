/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import Title from '../Title';
import Controls from '../Controls';
import Timer from '../Timer';
import ErrorBoundry from '../ErrorBoundry';

import classes from './Pomodoro.scss';

const Pomodoro = ({ title, workingTime }) => {
  return (
    <main className={classes.Main}>
      <Title title={title} />
      <ErrorBoundry>
        <Timer />
      </ErrorBoundry>
      <Controls time={workingTime} />
    </main>
  );
};

const mapStateToProps = ({ timer: { title }, settings: { workingTime } }) => {
  return { title, workingTime };
};

export default connect(mapStateToProps)(Pomodoro);
