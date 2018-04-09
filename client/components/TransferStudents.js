import React from 'react';
import { connect } from 'react-redux';
import { transferStudent } from '../store';

class TransferStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var options = event.target.options;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({ students: values });
  }

  render() {
    const { error, transfer, campus, students } = this.props;

    if(!campus) return null;

    return (
      <div>
        <h1>Transfer Students</h1>
        <p>Hold CTRL (Windows) / command (Mac) to select multiple students.</p>
        <ul className='error'>
          { error.map(err => (
            <li key={ err }>
              { err }
            </li>
          )) }
        </ul>
        <form onSubmit={ event => transfer(event, this.state.students, campus.id) }>
          <div className='form-group'>
            <select multiple={ true } value={ this.state.students } onChange={ this.handleChange }>
              { students.map(student => (
                <option key={ student.id } value={ student.id }>
                  { student.fullName }
                </option>
              ))}
            </select>
          </div>
          <button className='btn btn-outline-primary' disabled={ !this.state.students }>Transfer Students to { campus.name }</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  students: state.students.filter(student => student.campusId !== Number(match.params.id)),
  campus: state.campuses.find(campus => campus.id === Number(match.params.id)),
  error: state.error
});

const mapDispatch = (dispatch, { history }) => ({
  transfer(event, students, id) {
    event.preventDefault();
    dispatch(transferStudent(students, id, history));
  }
});

export default connect(mapState, mapDispatch)(TransferStudents);
