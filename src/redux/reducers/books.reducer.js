const booksReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.payload;
    default:
      return state;
  }
}

export default genresReducer;