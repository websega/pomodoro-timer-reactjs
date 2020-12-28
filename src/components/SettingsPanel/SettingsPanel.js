/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';

import PlusIcon from '../../assets/images/icons/add.svg';
import MinusIcon from '../../assets/images/icons/minus.svg';

import classes from './SettingsPanel.scss';

const SettingsPanel = ({
  isOpenSettings,
  decreaseWorkTime,
  workingTime,
  increaseWorkTime,
  decreaseLittleBreakTime,
  littleBreakTime,
  increaseLittleBreakTime,
  decreaseBigBreakTime,
  bigBreakTime,
  increaseBigBreakTime,
  decreasePomodorosInDay,
  pomodorosInDay,
  increasePomodorosInDay,
  decreasePomodorosInRound,
  pomodorosInRound,
  increasePomodorosInRound,
}) => {
  const cls = [classes.SettingsPanel];

  if (isOpenSettings) {
    cls.push(classes.open);
  }

  return (
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
  );
};

export default SettingsPanel;
