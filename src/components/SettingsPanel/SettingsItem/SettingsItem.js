import React from 'react';
import PropTypes from 'prop-types';

import PlusIcon from '../../../assets/images/icons/add.svg';
import MinusIcon from '../../../assets/images/icons/minus.svg';

import classes from './SettingsItem.scss';

const SettingsItem = React.memo(
  ({ title, value, isTime, onDecrease, onIncrease }) => {
    return (
      <div className={classes.SettingsItem}>
        <span className={classes.SettingsName}>{title}</span>
        <div>
          <button type="button" onClick={onDecrease} aria-label="Decrease">
            <MinusIcon />
          </button>
          {isTime ? (
            <span className={classes.Value}>{value}&nbsp;min</span>
          ) : (
            <span className={classes.Value}>{value}&nbsp;</span>
          )}
          <button type="button" onClick={onIncrease} aria-label="Increase">
            <PlusIcon />
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.value !== nextProps.value) {
      return false;
    }
    return true;
  }
);

SettingsItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  isTime: PropTypes.bool,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
};

SettingsItem.defaultProps = {
  title: 'Hello!',
  value: 0,
  isTime: false,
};

export default SettingsItem;
