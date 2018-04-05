import React from 'react';
import { Link } from 'react-router-dom';

const CampusItem = ({ campuses, students, del }) => (
  campuses.map(campus => {
    const count = !students ? null : `${students.filter(student => student.campusId == campus.id).length} students`;
    return (
      <div key={ campus.id } className='col-5 campus'>
        <div className='media'>
          <img className='col-6' src={ campus.imageUrl } />
          <div className='col-6'>
            <h5><Link to='#'>{ campus.name }</Link></h5>
            <p>{ count }</p>
            <div className='edit'>
              <button className='btn btn-primary'>Edit</button>
              { !del ? null :
                <button className='btn btn-danger' onClick={() => del(campus.id)}>Delete</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default CampusItem;

