import React, { useState, useRef } from 'react';

import SettingIcon from '../../assets/images/icons/settings.svg';
import ReplayIcon from '../../assets/images/icons/replay.svg';
import PlayIcon from '../../assets/images/icons/play.svg';
import PauseIcon from '../../assets/images/icons/pause.svg';
import StopIcon from '../../assets/images/icons/stop.svg';

import classes from './App.scss';

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

const radius = 180;
const circumference = 2 * Math.PI * radius;
const workingTime = 0.1;
const step = circumference / (workingTime * 60);

const App = () => {
  const [title, setTitle] = useState('Let`s get to work!');
  const [isRunning, setIsRunnig] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workingTime * 60);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const [dashOffset, setDashOffset] = useState(circumference);

  const intervalRef = useRef(null);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTitle('Let`s get to work!');
    setIsRunnig(false);

    setTimeLeft(workingTime * 60);
    setDashOffset(circumference);
  };

  const startTimer = () => {
    if (intervalRef.current !== null) {
      return;
    }

    if (workingTime >= 1) {
      setTitle(`Stay focus for ${workingTime} minutes.`);
    } else {
      setTitle(`Stay focus for ${workingTime * 60} seconds.`);
    }

    setIsRunnig(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time >= 1) {
          setDashOffset((prevDashOffset) => prevDashOffset - step);
          return time - 1;
        }

        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTitle('Keep going!');
    setIsRunnig(false);
  };

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  const toggleSettingsPanel = () => {
    console.log('toggle');
    setIsOpenSettings(!isOpenSettings);
  };

  const cls = [classes.SettingsPanel];

  if (isOpenSettings) {
    cls.push(classes.OpenSettingsPanel);
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

            <span className={classes.Count}>6 of 10 sessions</span>
          </div>
        </div>

        <div className={classes.Controls}>
          <button type="button" onClick={resetTimer}>
            <ReplayIcon />
          </button>

          {!isRunning && (
            <button type="button" onClick={startTimer}>
              <PlayIcon />
            </button>
          )}
          {isRunning && (
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
            <input type="text" />
            <span className={classes.Minutes}>min</span>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Litle break</span>
          <div>
            <input type="text" />
            <span className={classes.Minutes}>min</span>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Big break</span>
          <div>
            <input type="text" />
            <span className={classes.Minutes}>min</span>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Pomodoros in a round</span>
          <div>
            <input type="text" />
            <span className={classes.Minutes}>min</span>
          </div>
        </div>

        <div className={classes.SettingsItem}>
          <span className={classes.SettingsName}>Pomodoros in a day</span>
          <div>
            <input type="text" />
            <span className={classes.Minutes}>min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
