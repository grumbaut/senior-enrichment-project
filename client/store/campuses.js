import axios from 'axios';
import { destroyCampus } from './index';

const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const addCampusesToStore = campuses => {
  const action = { type: GOT_CAMPUSES, campuses };
  return action;
};

const addNewCampusToStore = campus => {
  const action = { type: GOT_NEW_CAMPUS, campus };
  return action;
};

const removeCampusFromStore = id => {
  const action = { type: REMOVE_CAMPUS, id };
  return action;
};

const addUpdatedCampusToStore = campus => {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
};

export const getCampuses = () =>
  dispatch =>
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(addCampusesToStore(campuses)));

export const postCampus = (campus, history) =>
  dispatch =>
    axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(addNewCampusToStore(campus));
        return campus.id;
      })
      .then(id => history.push(`/campuses/${id}`))
      .catch(error => console.error(error));

export const deleteCampus = (id, history) =>
  dispatch =>
    axios.delete(`/api/campuses/${id}`)
      .then(() => dispatch(removeCampusFromStore(id)))
      .then(() => dispatch(destroyCampus(id)))
      .then(() => history.push('/campuses'))
      .catch(error => console.error(error));

export const putCampus = (id, update, history) =>
  dispatch =>
    axios.put(`/api/campuses/${id}`, update)
      .then(res => res.data)
      .then(campus => dispatch(addUpdatedCampusToStore(campus)))
      .then(() => history.push(`/campuses/${id}`))
      .catch(error => console.error(error));

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_CAMPUSES:
    return action.campuses;
  case GOT_NEW_CAMPUS:
    return [ ...state, action.campus ];
  case REMOVE_CAMPUS:
    return state.filter(campus => campus.id !== Number(action.id));
  case UPDATE_CAMPUS:
    return state.map(campus => campus.id === action.campus.id ? action.campus : campus);
  default:
    return state;
  }
};

export const sortByName = array =>
  array.sort(((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0;
  }));

export default reducer;
