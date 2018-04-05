import axios from 'axios';

const GOT_STUDENTS = 'GOT_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const GOT_STUDENT = 'GOT_STUDENT';

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
      .then(() => history.push('/students'));

export const deleteStudent = (id, history) =>
  dispatch =>
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(removeStudentFromStore(id)))
      .then(() => history.push('/students'));

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_STUDENTS:
    return action.students;
  case REMOVE_STUDENT:
    return state.filter(student => student.id !== Number(action.id));
  case GOT_STUDENT:
    return [...state, action.student];
  default:
    return state;
  }
};

export default reducer;
