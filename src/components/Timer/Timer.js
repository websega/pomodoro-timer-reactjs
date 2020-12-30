/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/timer';
import { RADIUS, CIRCUMFERENCE } from '../../constants/timer';

import TimerInfo from '../TimerInfo';
import TimeBar from '../TimeBar';

import classes from './Timer.scss';

const Timer = ({
  bigBreakTime,
  littleBreakTime,
  workingTime,
  pomodorosInDay,
  pomodorosInRound,
  timeLeft,
  step,
  dashOffset,
  updateTimer,
  completedPomodoros,
  isStarted,
  mode,
  addPomodoro,
  switchToLittleBreak,
  switchToBigBreak,
  switchToWorking,
  updateStep,
  reset,
}) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    let intervalID;
    if (isStarted) {
      intervalID = setInterval(() => {
        updateTimer({ timeLeft: timeLeft - 1, dashOffset: dashOffset - step });

        if (mode === 'working' && timeLeft === 0) {
          const nowCompletedPomodoros = completedPomodoros + 1;
          addPomodoro();

          if (nowCompletedPomodoros === pomodorosInDay) {
            reset(workingTime);
          } else if (nowCompletedPomodoros === pomodorosInRound) {
            switchToBigBreak(bigBreakTime);
          } else {
            switchToLittleBreak(littleBreakTime);
            return;
          }
          return;
        }

        if ((mode === 'littleBreak' || mode === 'bigBreak') && timeLeft === 0) {
          if (completedPomodoros === pomodorosInDay) {
            reset(workingTime);
            return;
          }

          switchToWorking(workingTime);
        }
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [
    addPomodoro,
    bigBreakTime,
    completedPomodoros,
    dashOffset,
    isStarted,
    littleBreakTime,
    mode,
    pomodorosInDay,
    pomodorosInRound,
    reset,
    step,
    switchToBigBreak,
    switchToLittleBreak,
    switchToWorking,
    timeLeft,
    updateTimer,
    workingTime,
  ]);

  // обновить когда изменяем рабочее время
  useEffect(() => {
    updateTimer({
      timeLeft: workingTime * 60,
      dashOffset: CIRCUMFERENCE,
    });
    updateStep(CIRCUMFERENCE / (workingTime * 60));
  }, [updateStep, updateTimer, workingTime]);

  return (
    <div className={classes.Timer}>
      <TimeBar
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

const mapStateToProps = ({
  settings: {
    workingTime,
    pomodorosInDay,
    pomodorosInRound,
    bigBreakTime,
    littleBreakTime,
  },
  timer: { timeLeft, step, dashOffset, completedPomodoros, isStarted, mode },
}) => {
  return {
    workingTime,
    pomodorosInDay,
    timeLeft,
    step,
    dashOffset,
    completedPomodoros,
    isStarted,
    mode,
    pomodorosInRound,
    bigBreakTime,
    littleBreakTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {
    setTimer,
    setStep,
    addPomodoro,
    switchLittleBreak,
    switchBigBreak,
    switchWorking,
    resetTimer,
  } = bindActionCreators(actions, dispatch);

  return {
    updateTimer: (settings) => setTimer(settings),
    updateStep: (value) => setStep(value),
    switchToLittleBreak: (littleBreakTime) =>
      switchLittleBreak(littleBreakTime),
    switchToBigBreak: (bigBreakTime) => switchBigBreak(bigBreakTime),
    switchToWorking: (workingTime) => switchWorking(workingTime),
    reset: (workingTime) => dispatch(resetTimer(workingTime)),
    addPomodoro,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
