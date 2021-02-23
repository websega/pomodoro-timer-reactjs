// import { CIRCUMFERENCE } from '../../constants/timer';
import { WORKING_TIME } from '../../constants/initialConfig';

const initialState = {
  title: 'Let`s get to work!',
  mode: 'stopped',
  isStarted: false,
  completedPomodoros: 0,
  timeLeft: WORKING_TIME * 60,
  step: (2 * Math.PI * 180) / (WORKING_TIME * 60),
  dashOffset: 2 * Math.PI * 180,
  circumference: 2 * Math.PI * 180,
  radius: 180,
};

const resetTimer = (workingTime) => {
  return {
    ...initialState,
    timeLeft: workingTime * 60,
    step: (2 * Math.PI * 180) / (workingTime * 60),
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
    step: (2 * Math.PI * 180) / (time * 60),
    timeLeft: time * 60,
    dashOffset: 2 * Math.PI * 180,
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
      return resetTimer(payload.workingTime);
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
      return resetTimer(payload.workingTime);
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
      return resetTimer(payload);
    case 'SET_TIMER':
      return {
        ...state,
        timeLeft: payload.timeLeft,
        dashOffset: payload.dashOffset,
        step: payload.step,
      };
    case 'SET_TICK':
      return updateTimerEveryTick(state, payload);
    case 'SET_RADIUS':
      return {
        ...state,
        step: (2 * Math.PI * payload) / (WORKING_TIME * 60),
        dashOffset: 2 * Math.PI * payload,
        circumference: 2 * Math.PI * payload,
        radius: payload,
      };
    default:
      return state;
  }
};

export default reducer;
