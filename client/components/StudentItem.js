import React from 'react';
import { Link } from 'react-router-dom';

const StudentItem = ({ students }) => (
  <div className='row justify-content-center'>
    { students.map(student => {
      return (
        <div key={ student.id } className='student-item'>
          <img className='img-fluid' src={ student.imageUrl } />
          <h5><Link to={`/students/${student.id}`} student={ student }>{ student.fullName }</Link></h5>
          <a href={`mailto:${student.email}`}>{ student.email }</a>
          <p>GPA: { student.gpa }</p>
        </div>
      );
    })}
  </div>
);

export default StudentItem;
