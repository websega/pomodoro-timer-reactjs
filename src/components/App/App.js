/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';

import SettingIcon from '../../assets/images/icons/settings.svg';
import ReplayIcon from '../../assets/images/icons/replay.svg';
import PlayIcon from '../../assets/images/icons/play.svg';
import PauseIcon from '../../assets/images/icons/pause.svg';
import StopIcon from '../../assets/images/icons/stop.svg';
import PlusIcon from '../../assets/images/icons/add.svg';
import MinusIcon from '../../assets/images/icons/minus.svg';

import classes from './App.scss';

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

const radius = 180;
const circumference = 2 * Math.PI * radius;

const App = () => {
  // user value
  const [workingTime, setWorkingTime] = useState(2); // min
  const [littleBreakTime, setLittleBreakTime] = useState(1); // min
  const [bigBreakTime, setBigBreakTime] = useState(3); // min
  const [pomodorosInRound, setPomodorosInRound] = useState(2); // qty
  const [pomodorosInDay, setPomodorosInDay] = useState(10); // qty

  // timer status
  const [mode, setMode] = useState('stopped');
  const [isActive, setIsActive] = useState(false);

  // count
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // timer info
  const [title, setTitle] = useState('Let`s get to work!');
  const [timeLeft, setTimeLeft] = useState(workingTime * 60);

  // settings panel
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // svg settings
  const [step, setStep] = useState(circumference / (workingTime * 60));
  const [dashOffset, setDashOffset] = useState(circumference);

  const resetTimer = useCallback(() => {
    setTitle('Let`s get to work!');
    setTimeLeft(workingTime * 60);
    setMode('stopped');
    setIsActive(false);
    setStep(circumference / (workingTime * 60));
    setDashOffset(circumference);
    setCompletedPomodoros(0);
  }, [workingTime]);

  useEffect(() => {
    let intervalID;
    if (isActive) {
      intervalID = setInterval(() => {
        // каждый тик уменьшаем заполнение на шаг
        setDashOffset((prevDashOffset) => prevDashOffset - step);
        // каждый тик уменьшаем timeLeft
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [isActive, step]);

  useEffect(() => {
    // время работы истекло
    if (mode === 'working' && timeLeft === 0) {

      const nowCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(nowCompletedPomodoros);

      // закончить работу
      if (nowCompletedPomodoros === pomodorosInDay) {
        resetTimer();
        return;
      }

      // выбрать перерыв
      if (nowCompletedPomodoros === pomodorosInRound) {
        setMode('bigBreak');
        setTitle('Big break, warm up!');
        setStep(circumference / (bigBreakTime * 60));
        setTimeLeft(bigBreakTime * 60);
        setDashOffset(circumference);
      } else {
        setMode('littleBreak');
        setTitle('Take a short break and carry on!');
        setStep(circumference / (littleBreakTime * 60));
        setTimeLeft(littleBreakTime * 60);
        setDashOffset(circumference);
      }
      return;
    }

    // время перерыва истекло, уходим работать
    if ((mode === 'littleBreak' || mode === 'bigBreak') && timeLeft === 0) {
      setMode('working');
      setStep(circumference / (workingTime * 60));
      setDashOffset(circumference);

      if (workingTime >= 1) {
        setTitle(`Stay focus for ${workingTime} minutes.`);
      } else {
        setTitle(`Stay focus for ${workingTime * 60} seconds.`);
      }

      setTimeLeft(workingTime * 60);
    }
  }, [
    bigBreakTime,
    completedPomodoros,
    littleBreakTime,
    mode,
    pomodorosInDay,
    pomodorosInRound,
    resetTimer,
    step,
    timeLeft,
    workingTime,
  ]);

  useEffect(() => {
    setTimeLeft(workingTime * 60);
    setStep(circumference / (workingTime * 60));
  }, [workingTime]);

  const startTimer = () => {
    setMode('working');
    if (workingTime >= 1 && mode === 'working' && timeLeft !== 0) {
      setTitle(`Stay focus for ${workingTime} minutes.`);
    } else {
      setTitle(`Stay focus for ${workingTime * 60} seconds.`);
    }
    setIsActive(true);
  };

  const stopTimer = () => {
    setTitle('Keep going!');
    setIsActive(false);
    setMode('stopped');
  };

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  const toggleSettingsPanel = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  // work time change
  const increaseWorkTime = () => {
    setWorkingTime((prevState) => prevState + 1);
  };

  const decreaseWorkTime = () => {
    setWorkingTime((prevState) => prevState - 1);
  };

  // little breal time change
  const increaseLittleBreakTime = () => {
    setLittleBreakTime((prevState) => prevState + 1);
  };

  const decreaseLittleBreakTime = () => {
    setLittleBreakTime((prevState) => prevState - 1);
  };

  // big breal time change
  const increaseBigBreakTime = () => {
    setBigBreakTime((prevState) => prevState + 1);
  };

  const decreaseBigBreakTime = () => {
    setBigBreakTime((prevState) => prevState - 1);
  };

  // pomodoros in round change
  const increasePomodorosInRound = () => {
    setPomodorosInRound((prevState) => prevState + 1);
  };

  const decreasePomodorosInRound = () => {
    setPomodorosInRound((prevState) => prevState - 1);
  };

  // pomodoros in day change
  const increasePomodorosInDay = () => {
    setPomodorosInDay((prevState) => prevState + 1);
  };

  const decreasePomodorosInDay = () => {
    setPomodorosInDay((prevState) => prevState - 1);
  };

  const cls = [classes.SettingsPanel];

  if (isOpenSettings) {
    cls.push(classes.open);
  }

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <h1>PomodoRo</h1>

        <button
          type="button"
          className={classes.SettingBtn}
          onClick={toggleSettingsPanel}
        >
          <SettingIcon />
        </button>
      </header>

      <main className={classes.Main}>
        <h2 className={classes.Title}>{title}</h2>
        <div className={classes.Timer}>
          <svg className={classes.TimeBar}>
            <circle
              r={radius}
              cx="185"
              cy="185"
              fill="none"
              strokeDasharray={circumference}
            />
            <circle
              r={radius}
              cx="185"
              cy="185"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90,185,185)"
            />
          </svg>
          <svg
            className={classes.Point}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" />
          </svg>

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
        </div>

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
      </main>

      <div className={cls.join(' ')}>
        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Working time</span>
          <div>
            <button type="button" onClick={decreaseWorkTime}>
              <MinusIcon />
            </button>
            <input type="text" value={workingTime} readOnly />
            <span className={classes.Minutes}>min</span>
            <button type="button" onClick={increaseWorkTime}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Litle break</span>
          <div>
            <button type="button" onClick={decreaseLittleBreakTime}>
              <MinusIcon />
            </button>
            <input type="text" value={littleBreakTime} readOnly />
            <span className={classes.Minutes}>min</span>
            <button type="button" onClick={increaseLittleBreakTime}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Big break</span>
          <div>
            <button type="button" onClick={decreaseBigBreakTime}>
              <MinusIcon />
            </button>
            <input type="text" value={bigBreakTime} readOnly />
            <span className={classes.Minutes}>min</span>
            <button type="button" onClick={increaseBigBreakTime}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Pomodoros in a round</span>
          <div>
            <button type="button" onClick={decreasePomodorosInRound}>
              <MinusIcon />
            </button>
            <input type="text" value={pomodorosInRound} readOnly />
            <button type="button" onClick={increasePomodorosInRound}>
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Pomodoros in a day</span>
          <div>
            <button type="button" onClick={decreasePomodorosInDay}>
              <MinusIcon />
            </button>
            <input type="text" value={pomodorosInDay} readOnly />
            <button type="button" onClick={increasePomodorosInDay}>
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
