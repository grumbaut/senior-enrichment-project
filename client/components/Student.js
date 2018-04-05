import React from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';

class Student extends React.Component {
  constructor(props) {
    super(props);

  }

  campus() {
    const { student, campuses } = this.props;

    if(student.campusId) {
      const campus = campuses.find(campus => campus.id === Number(student.campusId));
      return (
        <div>
          <h2>This student is registered to a campus:</h2>
          <div className='student-campus'>
            <CampusItem campuses={[ campus ]} />
            <form>

            </form>
          </div>
        </div>
      );
    }
  };

  render() {
    const { student } = this.props;
    return (
      <div className='student-detail'>
        <div>
          <img src={ student.imageUrl } />
        </div>
        <div>
          <h1>{ student.fullName }</h1>
          <h2>GPA: { student.gpa }</h2>
          <div className='student-edit'>
            <button className='btn btn-primary'>Edit</button>
            <button className='btn btn-danger'>Delete</button>
          </div>
        </div>
        { this.campus() }
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  student: state.students.find(student => student.id === Number(ownProps.match.params.id)),
  campuses: state.campuses
});

export default connect(mapState)(Student);

