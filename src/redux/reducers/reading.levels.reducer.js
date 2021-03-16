const readingGradeLevels = (state = [], action) => {
  switch (action.type) {
    case 'SET_READING_GRADE_LEVELS':
      return action.payload;
    default:
      return state;
  }
}

export default readingGradeLevels;