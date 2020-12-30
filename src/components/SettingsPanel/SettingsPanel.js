/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { increase, decrease } from '../../redux/actions/settings';

import SettingsItem from './SettingsItem';

import classes from './SettingsPanel.scss';

const settingsItems = [
  {
    id: 'workingTime',
    title: 'Working time',
  },
  {
    id: 'littleBreakTime',
    title: 'Litle break',
  },
  {
    id: 'bigBreakTime',
    title: 'Big break',
  },
  {
    id: 'pomodorosInRound',
    title: 'Pomodoros in a round',
  },
  {
    id: 'pomodorosInDay',
    title: 'Pomodoros in a day',
  },
];

const SettingsPanel = React.memo((props) => {
  const { isOpen, onDecrease, onIncrease } = props;
  const cls = [classes.SettingsPanel];

  if (isOpen) {
    cls.push(classes.open);
  }

  return (
    <div className={cls.join(' ')}>
      {settingsItems.map(({ id, title }) => {
        return (
          <SettingsItem
            key={id}
            id={id}
            title={title}
            value={props[id]}
            onDecrease={() => onDecrease(id)}
            onIncrease={() => onIncrease(id)}
          />
        );
      })}
    </div>
  );
});

const mapStateToProps = ({
  settings: {
    workingTime,
    littleBreakTime,
    bigBreakTime,
    pomodorosInRound,
    pomodorosInDay,
  },
}) => {
  return {
    workingTime,
    littleBreakTime,
    bigBreakTime,
    pomodorosInRound,
    pomodorosInDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: (id) => dispatch(increase(id)),
    onDecrease: (id) => dispatch(decrease(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
