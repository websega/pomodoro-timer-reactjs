import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { startTimer, stopTimer, resetTimer } from '../../redux/actions/timer';

import ReplayIcon from '../../assets/images/icons/replay.svg';
import PlayIcon from '../../assets/images/icons/play.svg';
import PauseIcon from '../../assets/images/icons/pause.svg';
import StopIcon from '../../assets/images/icons/stop.svg';

import classes from './Controls.scss';

const Controls = ({ isStarted, start, stop, reset }) => {
  return (
    <div className={classes.Controls}>
      <button type="button" onClick={reset} aria-label="Reset">
        <ReplayIcon />
      </button>

      {isStarted ? (
        <button type="button" onClick={stop} aria-label="Pause">
          <PauseIcon />
        </button>
      ) : (
        <button type="button" onClick={start} aria-label="Start">
          <PlayIcon />
        </button>
      )}

      <button
        type="button"
        onClick={stop}
        disabled={!isStarted}
        aria-label="Stop"
      >
        <StopIcon />
      </button>
    </div>
  );
};

const mapStateToProps = ({ timer: { isStarted } }) => {
  return { isStarted };
};

const mapDispatchToProps = (dispatch, { time }) => {
  return {
    start: () => dispatch(startTimer()),
    stop: () => dispatch(stopTimer()),
    reset: () => dispatch(resetTimer(time)),
  };
};

Controls.propTypes = {
  isStarted: PropTypes.bool,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  isStarted: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
