const startTimer = () => {
  return { type: 'START_TIMER' };
};

const stopTimer = () => {
  return { type: 'STOP_TIMER' };
};

const resetTimer = (time) => {
  return { type: 'RESET_TIMER', payload: time };
};

const setTimer = (settings) => {
  return { type: 'SET_TIMER', payload: settings };
};

const setTick = (settings) => {
  return { type: 'SET_TICK', payload: settings };
};

export { startTimer, stopTimer, resetTimer, setTimer, setTick };
