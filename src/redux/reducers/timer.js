import { CIRCUMFERENCE } from '../../constants/timer';
import { WORKING_TIME } from '../../constants/initialConfig';

const initialState = {
  title: 'Let`s get to work!',
  mode: 'stopped',
  isStarted: false,
  completedPomodoros: 0,
  timeLeft: WORKING_TIME * 60,
  step: CIRCUMFERENCE / (WORKING_TIME * 60),
  dashOffset: CIRCUMFERENCE,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'START_TIMER':
      return {
        ...state,
        isStarted: true,
        mode: 'working',
        title: 'Stay focused for the rest of your time.',
      };
    case 'STOP_TIMER':
      return {
        ...state,
        isStarted: false,
        mode: 'stopped',
        title: 'Keep going!',
      };
    case 'RESET_TIMER':
      return {
        ...initialState,
        timeLeft: payload * 60,
        step: CIRCUMFERENCE / (payload * 60),
      };
    case 'SWITCH_LITTLE_BREAK':
      return {
        ...state,
        mode: 'littleBreak',
        title: 'Take a short break and carry on!',
        step: CIRCUMFERENCE / (payload * 60),
        timeLeft: payload * 60,
        dashOffset: CIRCUMFERENCE,
      };
    case 'SWITCH_BIG_BREAK':
      return {
        ...state,
        mode: 'bigBreak',
        title: 'Big break, warm up!',
        step: CIRCUMFERENCE / (payload * 60),
        timeLeft: payload * 60,
        dashOffset: CIRCUMFERENCE,
      };
    case 'SWITCH_WORKING':
      return {
        ...state,
        mode: 'working',
        title: 'Stay focused for the rest of your time.',
        step: CIRCUMFERENCE / (payload * 60),
        timeLeft: payload * 60,
        dashOffset: CIRCUMFERENCE,
      };
    case 'ADD_POMODORO':
      return {
        ...state,
        completedPomodoros: state.completedPomodoros + 1,
      };
    case 'SET_STEP':
      return {
        ...state,
        step: payload,
      };
    case 'SET_TIMER':
      return {
        ...state,
        timeLeft: payload.timeLeft,
        dashOffset: payload.dashOffset,
      };

    default:
      return state;
  }
};

export default reducer;
