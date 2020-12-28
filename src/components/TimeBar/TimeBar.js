/* eslint-disable react/prop-types */
import React from 'react';

import classes from './TimeBar.scss';

const TimeBar = ({ radius, circumference, dashOffset }) => {
  return (
    <>
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
      <svg
        className={classes.Point}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="15" />
      </svg>
    </>
  );
};

export default TimeBar;
