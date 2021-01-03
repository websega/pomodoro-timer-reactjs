import React from 'react';
import PropTypes from 'prop-types';

import classes from './TimerInfo.scss';

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

const TimerInfo = ({ timeLeft, completedPomodoros, pomodorosInDay }) => {
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className={classes.TimerInfo}>
      <div className={classes.Time}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <span className={classes.Count}>
        {completedPomodoros} of {pomodorosInDay} sessions
      </span>
    </div>
  );
};

TimerInfo.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  completedPomodoros: PropTypes.number.isRequired,
  pomodorosInDay: PropTypes.number.isRequired,
};

export default TimerInfo;
