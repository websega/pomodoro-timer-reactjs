const increase = (id) => {
  return { type: 'INCREASE', payload: id };
};

const decrease = (id) => {
  return { type: 'DECREASE', payload: id };
};

export { increase, decrease };
