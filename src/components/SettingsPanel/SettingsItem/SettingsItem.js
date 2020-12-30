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
          <button type="button" onClick={onDecrease} aria-label="Decrease">
            <MinusIcon />
          </button>
          <span className={classes.Value}>{value}&nbsp;min</span>
          <button type="button" onClick={onIncrease} aria-label="Increase">
            <PlusIcon />
          </button>
        </div>
      </div>
    );
  }
);

export default SettingsItem;
