const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(book => book.id == action.payload.id);
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
}

export default cartReducer;