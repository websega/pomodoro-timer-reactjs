import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import * as actions from '../../redux/actions/timer';

import TimerInfo from '../TimerInfo';
import Timeline from '../Timeline';

import classes from './Timer.scss';

const Timer = ({ settings, timer, updateTick, updateTimer, updateRadius }) => {
  const { workingTime, pomodorosInDay } = settings;
  const {
    isStarted,
    dashOffset,
    timeLeft,
    completedPomodoros,
    radius,
    circumference,
  } = timer;

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth;
      switch (true) {
        case windowWidth <= 400:
          updateRadius(140);
          break;
        case windowWidth > 400:
          updateRadius(180);
          break;
        default:
          break;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [updateRadius]);

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
      dashOffset: circumference,
      step: circumference / (workingTime * 60),
    });
  }, [circumference, updateTimer, workingTime]);

  return (
    <div className={classes.Timer}>
      <Timeline
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

const mapStateToProps = ({ settings, timer }) => {
  return {
    settings,
    timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { setTimer, setTick, setRadius } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    updateTick: (settings) => setTick(settings),
    updateTimer: (settings) => setTimer(settings),
    updateRadius: (radius) => setRadius(radius),
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
    circumference: PropTypes.number,
    radius: PropTypes.number,
  }).isRequired,
  updateTick: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  updateRadius: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
