const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      console.log('action remove', action.payload.id);
      console.log('state', state);
      return state.filter(book => action.payload.id !== book.book.id);
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
}

export default cartReducer;