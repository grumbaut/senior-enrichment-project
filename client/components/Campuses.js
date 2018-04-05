import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';
import CampusItem from './CampusItem';

const Campuses = ({ campuses, students, del }) => {
  if(!campuses) return null;

  return (
    <div>
      <div className='header'>
        <h1>All Campuses</h1>
        <Link to='/addcampus'><button className='btn btn-primary'>Add Campus</button></Link>
      </div>
      <div className='row justify-content-center'>
        <CampusItem campuses={ campuses } students={ students } del={ del } />
      </div>
    </div>
  );
};

const mapState = state => ({
  campuses: state.campuses,
  students: state.students
});

const mapDispatch = dispatch => ({
  del(id) {
    dispatch(deleteCampus(id));
  }
});

export default connect(mapState, mapDispatch)(Campuses);
