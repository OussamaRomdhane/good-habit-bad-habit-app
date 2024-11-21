export const getSecondaryHabitTypeColor = (type?: HabitType) => {
  if (type === 'good') {
    return '#27ae60';
  }

  if (type === 'bad') {
    return '#e74c3cda';
  }

  return '#7f8c8d';
};

export const getPrimaryHabitTypeColor = (type?: HabitType) => {
  if (type === 'good') {
    return '#CFF2E9';
  }

  if (type === 'bad') {
    return '#FFDEDC';
  }

  return 'transparent';
};
