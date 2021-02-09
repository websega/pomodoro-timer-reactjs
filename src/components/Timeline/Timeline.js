import React from 'react';
import PropTypes from 'prop-types';

import classes from './Timeline.scss';

const Timeline = React.memo(({ radius, circumference, dashOffset }) => {
  return (
    <svg className={classes.Timebar}>
      <circle
        r={radius}
        cx={radius + 5}
        cy={radius + 5}
        fill="none"
        strokeDasharray={circumference}
      />
      <circle
        r={radius}
        cx={radius + 5}
        cy={radius + 5}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90,${radius + 5},${radius + 5})`}
      />
    </svg>
  );
});

Timeline.propTypes = {
  radius: PropTypes.number.isRequired,
  circumference: PropTypes.number.isRequired,
  dashOffset: PropTypes.number.isRequired,
};

export default Timeline;
