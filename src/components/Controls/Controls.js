/* eslint-disable react/prop-types */
import React from 'react';

import ReplayIcon from '../../assets/images/icons/replay.svg';
import PlayIcon from '../../assets/images/icons/play.svg';
import PauseIcon from '../../assets/images/icons/pause.svg';
import StopIcon from '../../assets/images/icons/stop.svg';

import classes from './Controls.scss';

const Controls = ({ startTimer, stopTimer, resetTimer, isActive }) => {
  return (
    <div className={classes.Controls}>
      <button type="button" onClick={resetTimer}>
        <ReplayIcon />
      </button>

      {!isActive && (
        <button type="button" onClick={startTimer}>
          <PlayIcon />
        </button>
      )}
      {isActive && (
        <button type="button" onClick={stopTimer}>
          <PauseIcon />
        </button>
      )}

      <button type="button" onClick={stopTimer}>
        <StopIcon />
      </button>
    </div>
  );
};

export default Controls;
