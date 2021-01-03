const increase = (settingName) => {
  return { type: 'INCREASE', payload: settingName };
};

const decrease = (settingName) => {
  return { type: 'DECREASE', payload: settingName };
};

export { increase, decrease };
