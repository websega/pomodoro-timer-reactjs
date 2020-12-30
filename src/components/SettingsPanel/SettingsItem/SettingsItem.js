/* eslint-disable react/prop-types */
import React from 'react';

import PlusIcon from '../../../assets/images/icons/add.svg';
import MinusIcon from '../../../assets/images/icons/minus.svg';

import classes from './SettingdItem.scss';

const SettingsItem = React.memo(
  ({ id, title, value, onDecrease, onIncrease }) => {
    return (
      <div className={classes.SettingsItem} key={id}>
        <span className={classes.SettingsName}>{title}</span>
        <div>
          <button type="button" onClick={onDecrease}>
            <MinusIcon />
          </button>
          <input type="text" value={value} readOnly />
          <span className={classes.Minutes}>min</span>
          <button type="button" onClick={onIncrease}>
            <PlusIcon />
          </button>
        </div>
      </div>
    );
  }
);

export default SettingsItem;
