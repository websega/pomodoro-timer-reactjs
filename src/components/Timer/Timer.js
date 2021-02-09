import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import * as actions from '../../redux/actions/timer';
import { RADIUS, CIRCUMFERENCE } from '../../constants/timer';

import TimerInfo from '../TimerInfo';
import Timeline from '../Timeline';

import classes from './Timer.scss';

const Timer = ({ settings, timer, updateTick, updateTimer }) => {
  const { workingTime, pomodorosInDay } = settings;
  const { isStarted, dashOffset, timeLeft, completedPomodoros } = timer;

  useEffect(() => {
    let intervalID;
    if (isStarted) {
      intervalID = setInterval(() => {
        updateTick(settings);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [settings, isStarted, updateTick]);

  // обновить когда изменяем рабочее время
  useEffect(() => {
    updateTimer({
      timeLeft: workingTime * 60,
      dashOffset: CIRCUMFERENCE,
      step: CIRCUMFERENCE / (workingTime * 60),
    });
  }, [updateTimer, workingTime]);

  return (
    <div className={classes.Timer}>
      <Timeline
        radius={RADIUS}
        circumference={CIRCUMFERENCE}
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

const mapStateToProps = ({ settings, timer }) => {
  return {
    settings,
    timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { setTimer, setTick } = bindActionCreators(actions, dispatch);

  return {
    updateTick: (settings) => setTick(settings),
    updateTimer: (settings) => setTimer(settings),
  };
};

Timer.propTypes = {
  settings: PropTypes.shape({
    workingTime: PropTypes.number,
    pomodorosInDay: PropTypes.number,
    bigBreakTime: PropTypes.number,
    littleBreakTime: PropTypes.number,
    pomodorosInRound: PropTypes.number,
  }).isRequired,
  timer: PropTypes.shape({
    isStarted: PropTypes.bool,
    dashOffset: PropTypes.number,
    timeLeft: PropTypes.number,
    completedPomodoros: PropTypes.number,
  }).isRequired,
  updateTick: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
