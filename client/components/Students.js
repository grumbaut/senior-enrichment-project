import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

const Students = ({ students, del }) => {
  if(!students) return null;
  return (
    <div>
      <div className='header'>
        <h1>All Students</h1>
        <Link to='/addstudent'><button className='btn btn-primary'>Add Student</button></Link>
      </div>
      <div className='row justify-content-center'>
        { students.map(student => {
          return (
            <div key={ student.id } className='student-item'>
              <img className='img-fluid' src={ student.imageUrl } />
              <h5><Link to={`/students/${student.id}`} student={ student }>{ student.fullName }</Link></h5>
              <a href={`mailto:${student.email}`}>{ student.email }</a>
              <p>GPA: { student.gpa }</p>
              <div className='edit'>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger' onClick={ () => del(student.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
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
