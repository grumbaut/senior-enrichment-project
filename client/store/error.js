
const GOT_ERROR = 'GOT_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const gotError = err => {
  const error = err.response.data.errors.map(err => err.message);
  const action = { type: GOT_ERROR, error };
  return action;
};

export const clearError = () => {
  const action = { type: CLEAR_ERROR };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_ERROR:
    return [...state, action.error];
  case CLEAR_ERROR:
    return [];
  default:
    return state;
  }
};

export default reducer;
