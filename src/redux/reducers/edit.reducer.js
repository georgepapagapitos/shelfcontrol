const editReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_EDIT_BOOK':
      return action.payload;
    default:
      return state;
  }
}

export default editReducer;