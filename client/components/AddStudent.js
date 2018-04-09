import React from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store';

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    const campus = this.props.location.state ? this.props.location.state.campus : null;
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageUrl: undefined,
      campusId: campus ? campus.id : -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { error, campuses, post } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>Add Student</h1>
        <ul className='error'>
          { error.map(err => (
            <li key={ err }>
              { err }
            </li>
          )) }
        </ul>
        <form onSubmit={ (event) => post(event, this.state) }>
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
  campuses: state.campuses,
  error: state.error
});

const mapDispatch = (dispatch, { history }) => ({
  post(event, student) {
    event.preventDefault();
    dispatch(postStudent(student, history));
  }
});

export default connect(mapState, mapDispatch)(AddStudent);
