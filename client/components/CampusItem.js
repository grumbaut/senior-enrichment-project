import React from 'react';
import { Link } from 'react-router-dom';

const CampusItem = ({ campuses, students }) => (
  campuses.map(campus => {
    const count = !students ? null : `${students.filter(student => student.campusId == campus.id).length} students`;
    return (
      <div key={ campus.id } className='col-5 campus-item'>
        <div className='media'>
          <img className='col-6' src={ campus.imageUrl } />
          <div className='col-6'>
            <h5><Link to={`/campuses/${campus.id}`}>{ campus.name }</Link></h5>
            <p>{ count }</p>
          </div>
        </div>
      </div>
    );
  })
);

export default CampusItem;

