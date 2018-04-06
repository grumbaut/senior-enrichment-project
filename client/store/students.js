import axios from 'axios';
import { gotError } from './error';

const GOT_STUDENTS = 'GOT_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const GOT_STUDENT = 'GOT_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const addStudentsToStore = students => {
  const action = { type: GOT_STUDENTS, students};
  return action;
};

const removeStudentFromStore = id => {
  const action = { type: REMOVE_STUDENT, id};
  return action;
};

const addNewStudentToStore = student => {
  const action = { type: GOT_STUDENT, student };
  return action;
};

const addUpdatedStudentToStore = student => {
  const action = { type: UPDATE_STUDENT, student };
  return action;
};

export const getStudents = () =>
  dispatch =>
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(addStudentsToStore(students)));

export const postStudent = (student, history) =>
  dispatch =>
    axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => dispatch(addNewStudentToStore(student)))
      .then(() => history.push('/students'))
      .catch(error => dispatch(gotError(error)));

export const deleteStudent = (id, history) =>
  dispatch =>
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(removeStudentFromStore(id)))
      .then(() => history.push('/students'));

export const putStudent = (id, update) =>
  dispatch =>
    axios.put(`/api/students/${id}`, update )
      .then(res => res.data)
      .then(student => dispatch(addUpdatedStudentToStore(student)))
      .catch(error => dispatch(gotError(error)));

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_STUDENTS:
    return action.students;
  case REMOVE_STUDENT:
    return state.filter(student => student.id !== Number(action.id));
  case GOT_STUDENT:
    return [...state, action.student];
  case UPDATE_STUDENT:
    return state.map(student => student.id === action.student.id ? action.student : student);
  default:
    return state;
  }
};

export default reducer;
