import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className='row' id='main'>
    <div id='intro'>
      <img src='/images/small-rocket-ship-silhouette.svg' id='icon' />
      <h1>The Margaret Hamilton Interplanetary Academy of JavaScript</h1>
      <p>Welcome, campus administrator.<br />
        <Link to='/campuses'>Please manage your campuses.</Link>
      </p>
    </div>
  </div>
);

export default Home;
