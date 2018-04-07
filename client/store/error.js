
const GOT_ERROR = 'GOT_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const gotError = error => {
  error = error.response.data.errors[0].message;
  const action = { type: GOT_ERROR, error };
  return action;
};

export const clearError = () => {
  const action = { type: CLEAR_ERROR }
  return action;
};

const reducer = (state = null, action) => {
  switch (action.type) {
  case GOT_ERROR:
    return action.error;
  case CLEAR_ERROR:
    return null;
  default:
    return state;
  }
};

export default reducer;
