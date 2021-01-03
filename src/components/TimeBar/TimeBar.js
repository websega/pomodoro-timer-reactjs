import React from 'react';
import PropTypes from 'prop-types';

import classes from './TimeBar.scss';

const TimeBar = ({ radius, circumference, dashOffset }) => {
  return (
    <svg className={classes.TimeBar}>
      <circle
        r={radius}
        cx="185"
        cy="185"
        fill="none"
        strokeDasharray={circumference}
      />
      <circle
        r={radius}
        cx="185"
        cy="185"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90,185,185)"
      />
    </svg>
  );
};

TimeBar.propTypes = {
  radius: PropTypes.number.isRequired,
  circumference: PropTypes.number.isRequired,
  dashOffset: PropTypes.number.isRequired,
};

export default TimeBar;
