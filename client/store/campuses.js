import axios from 'axios';
import { gotError } from './index';

const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';

const addCampusesToStore = campuses => {
  const action = { type: GOT_CAMPUSES, campuses };
  return action;
}

const addNewCampusToStore = campus => {
  const action = { type: GOT_NEW_CAMPUS, campus };
  return action;
};

const removeCampusFromStore = id => {
  const action = { type: REMOVE_CAMPUS, id };
  return action;
};

export const getCampuses = () =>
  dispatch =>
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(addCampusesToStore(campuses)));

export const postCampus = (name, history) =>
  dispatch =>
    axios.post('/api/campuses', { name })
      .then(res => res.data)
      .then(campus => dispatch(addNewCampusToStore(campus)))
      .then(() => history.push('/campuses'))
      .catch(error => {
        error = error.response.data.errors[0].message;
        dispatch(gotError(error));
      });

export const deleteCampus = id =>
  dispatch =>
    axios.delete(`/api/campuses/${id}`)
      .then(() => dispatch(removeCampusFromStore(id)));

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_CAMPUSES:
    return action.campuses;
  case GOT_NEW_CAMPUS:
    return [ ...state, action.campus ];
  case REMOVE_CAMPUS:
    return state.filter(campus => campus.id !== Number(action.id));
  default:
    return state;
  }
};

export default reducer;
