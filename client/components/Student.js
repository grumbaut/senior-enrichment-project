import React from 'react';
import { connect } from 'react-redux';
import { putStudent, deleteStudent } from '../store';

import CampusItem from './CampusItem';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Select a campus...'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  campus() {
    const { match, student, campuses, put } = this.props;
    let campus = null;
    let registration = `This student is not part of a campus. Please select a campus.`;

    if(student.campusId) {
      campus = campuses.find(campus => campus.id === Number(student.campusId));
      registration = 'This student is registered to the following campus:';
    }

    return (
      <div className='student-detail'>
        <h2>{ registration }</h2>
        <div className='student-detail'>
          { campus && <CampusItem campuses={[ campus ]} /> }
          <form onSubmit={ (event) => put(event, match.params.id, { campusId: Number(this.state.value) })}>
            <select name='campus' value={ this.state.value } onChange={ this.handleChange }>
              <option value='-1'>Select a campus...</option>
              { campuses && campuses.map(campus => (
                <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
              ))}
            </select>
            <br />
            <button className='btn btn-primary'>Change Campus</button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { student, del } = this.props;

    if(!student) return null;

    return (
      <div>
        <div className='student-detail'>
          <div>
            <img src={ student.imageUrl } />
          </div>
          <div>
            <h1>{ student.fullName }</h1>
            <h2>GPA: { student.gpa }</h2>
            <div className='student-edit'>
              <button className='btn btn-primary'>Edit</button>
              <button className='btn btn-danger' onClick={ () => del(student.id) }>Delete</button>
            </div>
          </div>
        </div>
        { this.campus() }
      </div>
    );
  }
}

const mapState = (state,  { match }) => ({
  student: state.students.find(student => student.id === Number(match.params.id)),
  campuses: state.campuses
});

const mapDispatch = (dispatch, { history }) => ({
  del(id) {
    dispatch(deleteStudent(id, history));
  },
  put(event, id, update) {
    event.preventDefault();
    dispatch(putStudent(id, update));
  }
});

export default connect(mapState, mapDispatch)(Student);

