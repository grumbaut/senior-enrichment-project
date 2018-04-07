import React from 'react';
import { connect } from 'react-redux';
import { postStudent, putStudent, clearError } from '../store';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    const student = this.props.student;
    const campus = this.props.location.state && this.props.location.state.campus ? this.props.location.state.campus : null;
    this.state = { student: {
      firstName: student ? student.firstName : '',
      lastName: student ? student.lastName : '',
      email: student ? student.email : '',
      gpa: student ? student.gpa : '',
      imageUrl: student ? student.imageUrl : undefined,
      campusId: campus ? campus.id : student ? student.campusId : undefined
    }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(Object.assign(
      this.state.student,
      { [event.target.name]: event.target.value })
    );
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  render() {
    const { error, post, campuses, put, student } = this.props;
    return (
      <div>
        <h1>{ student ? 'Edit Student' : 'Add Student' }</h1>
        { error ? <p><strong>{ error }</strong></p> : null }
        <form onSubmit={ (event) => student ? put(event, student.id, this.state.student) : post(event, this.state.student) }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              name='firstName'
              className='form-control'
              value={ this.state.student.firstName }
              onChange={ (event) => this.handleChange(event)} />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              name='lastName'
              className='form-control'
              value={ this.state.student.lastName }
              onChange={ (event) => this.handleChange(event)} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              className='form-control'
              value={ this.state.student.email }
              onChange={ (event) => this.handleChange(event)} />
          </div>
          <div className='form-group'>
            <label htmlFor='gpa'>GPA:</label>
            <input
              name='gpa'
              className='form-control'
              value={ this.state.student.gpa }
              onChange={ (event) => this.handleChange(event)} />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              name='imageUrl'
              className='form-control'
              value={ this.state.student.imageUrl }
              onChange={ (event) => this.handleChange(event)} />
          </div>
          <div className='form-group'>
            <label htmlFor='campusId'>Campus:</label>
            <br />
            <select name='campusId' value={ this.state.student.campusId } onChange={ this.handleChange }>
              <option value='-1'>Select a campus...</option>
              { campuses && campuses.map(campus => (
                <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
              ))}
            </select>
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  error: state.error,
  campuses: state.campuses,
  student: !match.params.id ? null : state.students.find(student => student.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  post(event, student) {
    event.preventDefault();
    dispatch(postStudent(student, history));
  },
  put(event, id, update) {
    event.preventDefault();
    dispatch(putStudent(id, update, history));
  },
  clearError() {
    dispatch(clearError());
  }
});

export default connect(mapState, mapDispatch)(StudentForm);
