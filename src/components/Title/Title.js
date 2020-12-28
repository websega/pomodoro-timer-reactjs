/* eslint-disable react/prop-types */
import React from 'react';

import classes from './Title.scss';

const Title = ({ title }) => {
  return <h2 className={classes.Title}>{title}</h2>;
};

export default Title;
