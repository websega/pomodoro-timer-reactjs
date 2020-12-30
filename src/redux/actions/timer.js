const startTimer = (time) => {
  return { type: 'START_TIMER', payload: time };
};

const stopTimer = () => {
  return { type: 'STOP_TIMER' };
};

const resetTimer = (time) => {
  return { type: 'RESET_TIMER', payload: time };
};

const addPomodoro = () => {
  return { type: 'ADD_POMODORO' };
};

const switchLittleBreak = (littleBreak) => {
  return { type: 'SWITCH_LITTLE_BREAK', payload: littleBreak };
};

const switchBigBreak = (bigBreak) => {
  return { type: 'SWITCH_BIG_BREAK', payload: bigBreak };
};

const switchWorking = (workingTime) => {
  return { type: 'SWITCH_WORKING', payload: workingTime };
};

const setStep = (value) => {
  return { type: 'SET_STEP', payload: value };
};

const setTimer = (settings) => {
  return { type: 'SET_TIMER', payload: settings };
};

export {
  startTimer,
  stopTimer,
  resetTimer,
  addPomodoro,
  setStep,
  setTimer,
  switchLittleBreak,
  switchBigBreak,
  switchWorking,
};
