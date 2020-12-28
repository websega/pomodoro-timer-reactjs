/* eslint-disable react/prop-types */
import React from 'react';

import TimerInfo from '../TimerInfo';
import TimeBar from '../TimeBar';

import classes from './Timer.scss';

const Timer = ({
  radius,
  circumference,
  dashOffset,
  timeLeft,
  completedPomodoros,
  pomodorosInDay,
}) => {
  return (
    <div className={classes.Timer}>
      <TimeBar
        radius={radius}
        circumference={circumference}
        dashOffset={dashOffset}
      />
      <TimerInfo
        timeLeft={timeLeft}
        completedPomodoros={completedPomodoros}
        pomodorosInDay={pomodorosInDay}
      />
    </div>
  );
};

export default Timer;
