const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CART':
      console.log('set cart', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default cartReducer;