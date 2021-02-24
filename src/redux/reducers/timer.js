import { CIRCUMFERENCE, RADIUS } from '../../constants/timer';
import { WORKING_TIME } from '../../constants/initialConfig';

const initialState = {
  title: 'Let`s get to work!',
  mode: 'stopped',
  isStarted: false,
  completedPomodoros: 0,
  timeLeft: WORKING_TIME * 60,
  step: CIRCUMFERENCE / (WORKING_TIME * 60),
  dashOffset: CIRCUMFERENCE,
  circumference: CIRCUMFERENCE,
  radius: RADIUS,
};

const resetTimer = (state, workingTime) => {
  const circumference = 2 * Math.PI * state.radius;

  return {
    ...initialState,
    timeLeft: workingTime * 60,
    step: circumference / (workingTime * 60),
    dashOffset: circumference,
    circumference,
    radius: state.radius,
  };
};

const switchMode = (state, mode, title, payload) => {
  let time = payload.workingTime;

  if (mode === 'bigBreak') {
    time = payload.bigBreakTime;
  } else if (mode === 'littleBreak') {
    time = payload.littleBreakTime;
  }

  return {
    ...state,
    mode,
    title,
    step: (2 * Math.PI * state.radius) / (time * 60),
    timeLeft: time * 60,
    dashOffset: 2 * Math.PI * state.radius,
    completedPomodoros:
      mode === 'working'
        ? state.completedPomodoros
        : state.completedPomodoros + 1,
  };
};

const updateTimerEveryTick = (state, payload) => {
  if (state.mode === 'working' && state.timeLeft === 0) {
    const nowCompletedPomodoros = state.completedPomodoros + 1;

    if (nowCompletedPomodoros === payload.pomodorosInDay) {
      return resetTimer(state, payload.workingTime);
    }

    if (nowCompletedPomodoros === payload.pomodorosInRound) {
      return switchMode(state, 'bigBreak', 'Big break, warm up!', payload);
    }

    return switchMode(
      state,
      'littleBreak',
      'Take a short break and carry on!',
      payload
    );
  }

  if (
    (state.mode === 'littleBreak' || state.mode === 'bigBreak') &&
    state.timeLeft === 0
  ) {
    if (state.completedPomodoros === payload.pomodorosInDay) {
      return resetTimer(state, payload.workingTime);
    }

    return switchMode(
      state,
      'working',
      'Stay focused for the rest of your time.',
      payload
    );
  }

  return {
    ...state,
    timeLeft: state.timeLeft - 1,
    dashOffset: state.dashOffset - state.step,
  };
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
      return resetTimer(state, payload);
    case 'SET_TIMER':
      return {
        ...state,
        timeLeft: payload * 60,
        dashOffset: 2 * Math.PI * state.radius,
        step: state.circumference / (payload * 60),
      };
    case 'SET_TICK':
      return updateTimerEveryTick(state, payload);
    case 'RESIZE': {
      const circumference = 2 * Math.PI * payload.radius;
      const step = circumference / (payload.workingTime * 60);

      return {
        ...state,
        step,
        dashOffset:
          circumference - step * (payload.workingTime * 60 - state.timeLeft),
        circumference,
        radius: payload.radius,
      };
    }
    default:
      return state;
  }
};

export default reducer;
