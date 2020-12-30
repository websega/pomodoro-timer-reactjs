import {
  WORKING_TIME,
  LITTLE_BREAK_WORK,
  BIG_BREAK_TIME,
  POMODOROS_IN_ROUND,
  POMODOROS_IN_DAY,
} from '../../constants/initialConfig';

const initialState = {
  workingTime: WORKING_TIME,
  littleBreakTime: LITTLE_BREAK_WORK,
  bigBreakTime: BIG_BREAK_TIME,
  pomodorosInRound: POMODOROS_IN_ROUND,
  pomodorosInDay: POMODOROS_IN_DAY,
};

const updateSettings = (state, type, key) => {
  if (
    (state[key] === 1 && type === 'DECREASE') ||
    (state[key] === 60 && type === 'INCREASE')
  ) {
    return state;
  }

  let quantity = 1;

  if (type === 'DECREASE') {
    quantity = -1;
  }

  return {
    ...state,
    [key]: state[key] + quantity,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INCREASE':
      return updateSettings(state, type, payload);
    case 'DECREASE':
      return updateSettings(state, type, payload);

    default:
      return state;
  }
};

export default reducer;
