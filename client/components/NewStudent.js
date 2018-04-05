import React from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store';

class NewStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageUrl: undefined
    }
    };
  }

  handleChange(event) {
    this.setState(Object.assign(
      this.state.student,
      { [event.target.name]: event.target.value })
    );
  }

  render() {
    return (
      <div>
        <h1>Add Student</h1>
        <form onSubmit={ (event) => this.props.post(event, this.state.student) }>
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
              type='email'
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
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  post(event, student) {
    event.preventDefault();
    // if(!student.imageUrl) {
    //   delete student.imageUrl;
    // }
    dispatch(postStudent(student, ownProps.history));
  }
});

export default connect(null, mapDispatch)(NewStudent);
