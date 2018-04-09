import React from 'react';
import { connect } from 'react-redux';
import { putStudent, clearError } from '../store';

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    const student = this.props.student || null;
    this.state = {
      firstName: student ? student.firstName : '',
      lastName: student ? student.lastName : '',
      email: student ? student.email : '',
      gpa: student ? student.gpa : '',
      imageUrl: student ? student.imageUrl : undefined,
      campusId: student ? student.campusId : -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.student) {
      if(this.state.firstName !== nextProps.student.firstName) {
        this.setState(nextProps.student);
      }
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if(this.props.error.length) {
      this.props.clearError();
    }
  }

  render() {
    const { error, campuses, put, student } = this.props;
    if(!student) return null;
    return (
      <div>
        <h1>Edit Student</h1>
        <ul className='error'>
          { error.map(err => (
            <li key={ err }>
              { err }
            </li>
          )) }
        </ul>
        <form onSubmit={ (event) => put(event, student.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              name='firstName'
              className='form-control'
              value={ this.state.firstName }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              name='lastName'
              className='form-control'
              value={ this.state.lastName }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              className='form-control'
              value={ this.state.email }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='gpa'>GPA:</label>
            <input
              type='text'
              name='gpa'
              className='form-control'
              value={ this.state.gpa }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              type='text'
              name='imageUrl'
              className='form-control'
              value={ this.state.imageUrl }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='campusId'>Campus:</label>
            <br />
            <select name='campusId' value={ this.state.campusId } onChange={ this.handleChange }>
              <option value='-1'>Select a campus...</option>
              { campuses && campuses.map(campus => (
                <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
              ))}
            </select>
          </div>
          <button type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='btn btn-outline-success' onClick={ this.goBack }>Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match, history }) => ({
  student: state.students.find(student => student.id === Number(match.params.id)),
  campuses: state.campuses,
  error: state.error
});

const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update) {
    event.preventDefault();
    dispatch(putStudent(id, update, history));
  },
  clear() {
    dispatch(clearError());
  }
});

export default connect(mapState, mapDispatch)(EditStudent);

