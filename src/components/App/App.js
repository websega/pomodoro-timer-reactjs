import React from 'react';
import SettingIcon from '../../assets/images/icons/settings.svg';
import ReplayIcon from '../../assets/images/icons/replay.svg';
// import PlayIcon from '../../assets/images/icons/play.svg';
import PauseIcon from '../../assets/images/icons/pause.svg';
import StopIcon from '../../assets/images/icons/stop.svg';

import classes from './App.scss';

function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <h1>PomodoRo</h1>

        <button type="button" className={classes.SettingBtn}>
          <SettingIcon />
        </button>
      </header>

      <main className={classes.Main}>
        <h2 className={classes.Title}>Stay focus for 25 minutes</h2>

        <div className={classes.Timer}>
          <svg className={classes.TimeBar}>
            <circle
              r="180"
              cx="185"
              cy="185"
              fill="none"
              strokeDasharray="1130.9733552923256"
            />
            <circle
              r="180"
              cx="185"
              cy="185"
              fill="none"
              strokeDasharray="1130.9733552923256"
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
              <span className="minutes">00</span>
              <span className="colon">:</span>
              <span className="seconds">00</span>
            </div>

            <span className={classes.Count}>6 of 10 sessions</span>
          </div>
        </div>

        <div className={classes.Controls}>
          <button type="button">
            <ReplayIcon />
          </button>
          <button type="button">
            {/* <PlayIcon /> */}
            <PauseIcon />
          </button>
          <button type="button">
            <StopIcon />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
