import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Title from '../Title';
import Controls from '../Controls';
import Timer from '../Timer';
import ErrorBoundry from '../ErrorBoundry';

import classes from './Pomodoro.scss';

const Pomodoro = ({ title }) => {
  return (
    <main className={classes.Main}>
      <Title title={title} />
      <ErrorBoundry>
        <Timer />
      </ErrorBoundry>
      <Controls />
    </main>
  );
};

const mapStateToProps = ({ timer: { title } }) => {
  return { title };
};

Pomodoro.propTypes = {
  title: PropTypes.string,
};

Pomodoro.defaultProps = {
  title: 'Hello!',
};

export default connect(mapStateToProps)(Pomodoro);
