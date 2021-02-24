const startTimer = () => {
  return { type: 'START_TIMER' };
};

const stopTimer = () => {
  return { type: 'STOP_TIMER' };
};

const resetTimer = (time) => {
  return { type: 'RESET_TIMER', payload: time };
};

const setTimer = (workingTime) => {
  return { type: 'SET_TIMER', payload: workingTime };
};

const setTick = (settings) => {
  return { type: 'SET_TICK', payload: settings };
};

const resize = (payload) => {
  return { type: 'RESIZE', payload };
};

export { startTimer, stopTimer, resetTimer, setTimer, setTick, resize };
