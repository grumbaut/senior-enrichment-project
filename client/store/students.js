import axios from 'axios';
import { gotError, clearError } from './index';

const GOT_STUDENTS = 'GOT_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const GOT_STUDENT = 'GOT_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';

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

export const destroyCampus = id => {
  const action = { type: DESTROY_CAMPUS, id };
  return action;
};

export const getStudents = () =>
  dispatch =>
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(addStudentsToStore(students)))
      .catch(error => console.error(error));

export const postStudent = (student, history) =>
  dispatch =>
    Promise.all([
      axios.post('/api/students', student),
      dispatch(clearError())
    ])
      .then(res => res[0].data)
      .then(student => {
        dispatch(addNewStudentToStore(student));
        return student.id;
      })
      .then(id => history.push(`/students/${id}`))
      .catch(error => dispatch(gotError(error)));

export const deleteStudent = (id, history) =>
  dispatch =>
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(removeStudentFromStore(id)))
      .then(() => history.push('/students'))
      .catch(error => console.error(error));

export const putStudent = (id, update, history) =>
  dispatch =>
    Promise.all([
      axios.put(`/api/students/${id}`, update ),
      dispatch(clearError())
    ])
      .then(res => res[0].data)
      .then(student => dispatch(addUpdatedStudentToStore(student)))
      .then(() => history.push(`/students/${id}`))
      .catch(error => dispatch(gotError(error)));

export const transferStudent = (students, id, history) =>
  dispatch =>
    axios.put(`/api/students/transfer/${id}`, { students, id })
      .then(res => res.data)
      .then(students => students.forEach(student => dispatch(addUpdatedStudentToStore(student))))
      .then(() => history.push(`/campuses/${id}`))
      .catch(error => console.error(error));

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
  case DESTROY_CAMPUS:
    return state.map(student => student.campusId === Number(action.id) ? Object.assign(student, { campusId: null }) : student);
  default:
    return state;
  }
};

export default reducer;
