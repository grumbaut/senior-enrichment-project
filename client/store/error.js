
const GOT_ERROR = 'GOT_ERROR';

export const gotError = error => {
  const action = { type: GOT_ERROR, error };
  return action;
};

const reducer = (state = null, action) => {
  switch (action.type) {
  case GOT_ERROR:
    return action.error;
  default:
    return state;
  }
};

export default reducer;
