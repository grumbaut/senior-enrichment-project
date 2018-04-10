import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';

import StudentItem from './StudentItem';
import TransferDropdown from './TransferDropdown';

const Campus = ({ campus, students, del, match }) => {
  const id = match.params.id;
  const campusStudents = students.filter(student => student.campusId === Number(id));
  const studentsNotOnCampus = students.filter(student => student.campusId !== Number(id));

  if(!campus) return null;
  return (
    <div>
      <div className='row campus justify-content-center'>
        <div className='col-md-6 col-sm-12'>
          <img className='img-fluid' src={ campus.imageUrl} />
        </div>
        <div className='col-md-6 col-sm-12'>
          <h1>{ campus.name }</h1>
          <p><strong>City: </strong>{ campus.city }</p>
          <p><strong>Planet: </strong>{ campus.planet }</p>
          <p>{ campus.description }</p>
          <Link to={`/editcampus/${campus.id}`}><button className='btn btn-outline-primary'>Edit</button></Link>
          <button className='btn btn-outline-danger' onClick={ () => del(campus.name) }>Delete</button>
        </div>
      </div>
      <div className='row students-on-campus'>
        <div className='col-md-6 col-sm-12'>
          <h1>{ !campusStudents.length ? 'There are no students on this campus.' : 'Students on Campus' }</h1>
        </div>
        <div className='col-md-6 col-sm-12' id='add-student-to-campus'>
          <Link to={{
            pathname: '/addstudent',
            state: { campus }
          }}>
            <button className='btn btn-outline-primary'>
              Add New Student
            </button>
          </Link>
          <Link to={`/transfer/${campus.id}`}>
            <button className='btn btn-outline-success'>
            Transfer Multiple Students
            </button>
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <TransferDropdown students={ studentsNotOnCampus } campus={ campus } />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <StudentItem students={ campusStudents } />
        </div>
      </div>
    </div>
  );
};

const mapState = (state, { match }) => ({
  campus: state.campuses.find(campus => campus.id === Number(match.params.id)),
  students: state.students
});

const mapDispatch = (dispatch, { history, match }) => ({
  del(name) {
    if(window.confirm(`Are you sure you want to delete the ${name}?`)){
      dispatch(deleteCampus(match.params.id, history));
    }
  }
});

export default connect(mapState, mapDispatch)(Campus);

