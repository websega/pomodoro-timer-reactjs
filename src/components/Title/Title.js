import React from 'react';
import PropTypes from 'prop-types';

import classes from './Title.scss';

const Title = ({ title }) => {
  return <h2 className={classes.Title}>{title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: 'Hello!',
};

export default Title;
