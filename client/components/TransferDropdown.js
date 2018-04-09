import React from 'react';
import { putStudent } from '../store';
import { connect } from 'react-redux';

class TransferDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: -1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ studentId: event.target.value });
  }

  render() {
    const { students, put, campus, campuses } = this.props;
    if(!campus) return null;
    const student = students.find(student => student.id === Number(this.state.studentId));
    return (
      <div className='row form'>
        <form onSubmit={ event => put(event, this.state.studentId, { campusId: campus.id }, student) }>
          <select value={ this.state.campusId } onChange={ this.handleChange }>
            <option value='-1'>Select a student...</option>
            { students.map(student => (
              <option key={ student.id } value={ student.id }>
                { student.fullName }
              </option>
            ))}
          </select>
          <button type='submit' className='btn btn-outline-primary'>Transfer</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  campuses: state.campuses
});

const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update, student) {
    event.preventDefault();
    dispatch(putStudent(id, update, history))
  }
});

export default connect(mapState, mapDispatch)(TransferDropdown);
