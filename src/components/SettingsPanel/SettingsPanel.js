import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { increase, decrease } from '../../redux/actions/settings';

import SettingsItem from './SettingsItem';

import classes from './SettingsPanel.scss';

const settingsItems = [
  {
    settingName: 'workingTime',
    title: 'Working time',
    isTime: true,
  },
  {
    settingName: 'littleBreakTime',
    title: 'Litle break',
    isTime: true,
  },
  {
    settingName: 'bigBreakTime',
    title: 'Big break',
    isTime: true,
  },
  {
    settingName: 'pomodorosInRound',
    title: 'Pomodoros in a round',
    isTime: false,
  },
  {
    settingName: 'pomodorosInDay',
    title: 'Pomodoros in a day',
    isTime: false,
  },
];

const SettingsPanel = (props) => {
  const { isOpen, onDecrease, onIncrease } = props;
  const cls = [classes.SettingsPanel];

  if (isOpen) {
    cls.push(classes.open);
  }

  return (
    <div className={cls.join(' ')}>
      {settingsItems.map(({ settingName, title, isTime }) => {
        return (
          <SettingsItem
            key={settingName}
            title={title}
            value={props[settingName]}
            isTime={isTime}
            onDecrease={() => onDecrease(settingName)}
            onIncrease={() => onIncrease(settingName)}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  return settings;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: (settingName) => dispatch(increase(settingName)),
    onDecrease: (settingName) => dispatch(decrease(settingName)),
  };
};

SettingsPanel.propTypes = {
  isOpen: PropTypes.bool,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
};

SettingsPanel.defaultProps = {
  isOpen: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
