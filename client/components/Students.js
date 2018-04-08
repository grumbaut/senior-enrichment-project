import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

import StudentItem from './StudentItem';

const Students = ({ students, del }) => {
  if(!students.length) {
    return (
      <div className='empty-message'>
        <h2>There are no students in the database.</h2>
        <Link to='/studentform'><button className='btn btn-outline-primary'>Add Student</button></Link>
      </div>
    );
  }

  return (
    <div>
      <div className='header'>
        <h1>All Students</h1>
        <Link to='/studentform'><button className='btn btn-outline-primary'>Add Student</button></Link>
      </div>
      <StudentItem students={ students } />
    </div>
  );
};

const mapState = state => ({
  students: state.students
});

const mapDispatch = dispatch => ({
  del(id) {
    dispatch(deleteStudent(id));
  }
});

export default connect(mapState, mapDispatch)(Students);
