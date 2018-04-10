import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { putStudent, deleteStudent } from '../store';

import StudentCampusDetail from './StudentCampusDetail';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: -1, editMode: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { student, del, campuses, match, put } = this.props;

    if(!student) return null;

    const campus = campuses.find(campus => campus.id === student.campusId);

    return (
      <div>
        <div className='student-detail'>
          <div>
            <img id='student-img' src={ student.imageUrl } />
          </div>
          <div>
            <h1>{ student.fullName }</h1>
            <h2>GPA: { student.gpa }</h2>
            <div className='student-edit'>
              <Link to={`/editstudent/${student.id}`}><button className='btn btn-outline-primary'>Edit</button></Link>
              <button className='button-margin btn btn-outline-danger' onClick={ () => del(student.fullName) }>Delete</button>
            </div>
          </div>
        </div>
        <StudentCampusDetail match={ match } student= { student } campuses={ campuses } campus={ campus } put={ put } />
      </div>
    );
  }

}

const mapState = (state,  { match }) => ({
  student: state.students.find(student => student.id === Number(match.params.id)),
  campuses: state.campuses
});

const mapDispatch = (dispatch, { history, match }) => ({
  del(name) {
    if(window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteStudent(match.params.id, history));
    }
  },
  put(event, id, update) {
    event.preventDefault();
    dispatch(putStudent(id, update, history));
  }
});

export default connect(mapState, mapDispatch)(Student);

