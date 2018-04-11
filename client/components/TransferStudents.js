import React from 'react';
import { connect } from 'react-redux';
import { transferStudent, sortByLastName } from '../store';

class TransferStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange(event) {
    const options = event.target.options;
    let values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({ students: values });
  }

  render() {
    const { transfer, campus, students } = this.props;

    if(!campus) return null;

    return (
      <div>
        <h1>Transfer Multiple Students</h1>
        <p>Hold CTRL (Windows) / command (Mac) to select multiple students.</p>
        <form onSubmit={ event => transfer(event, this.state.students, campus.id) }>
          <div className='form-group'>
            <select
              id='transfer'
              multiple={ true } value={ this.state.students }
              onChange={ this.handleChange }>
              { students.map(student => (
                <option key={ student.id } value={ student.id }>
                  { student.fullName }
                </option>
              ))}
            </select>
          </div>
          <button type='submit' disabled={ this.state.students.length === 0 } className='btn btn-outline-primary' >Transfer Students to { campus.name }</button>
          <button type='button' onClick={ this.goBack } className='button-margin btn btn-outline-success'>Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  students: sortByLastName(state.students.filter(student => student.campusId !== Number(match.params.id))),
  campus: state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  transfer(event, students, id) {
    event.preventDefault();
    dispatch(transferStudent(students, id, history));
  }
});

export default connect(mapState, mapDispatch)(TransferStudents);
