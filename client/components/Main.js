import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCampuses, getStudents } from '../store';

import Nav from './Nav';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import CampusForm from './CampusForm';
import StudentForm from './StudentForm';
import Student from './Student';
import Campus from './Campus';
import Footer from './Footer';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <div className='container-fluid'>
            <Switch>
              <Route path='/students/:id' component={ Student } />
              <Route path='/campuses/:id' component={ Campus } />
              <Route path='/studentform/:id' component={ StudentForm } />
              <Route path='/campusform/:id' component={CampusForm } />
              <Route path='/students' component={ Students } />
              <Route path='/campuses' component={ Campuses } />
              <Route path='/campusform' component={ CampusForm } />
              <Route path='/studentform' component={ StudentForm } />
              <Route exact path='/' component={ Home } />
            </Switch>
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => ({
  fetch() {
    dispatch(getCampuses());
    dispatch(getStudents());
  }
});

export default connect(mapState, mapDispatch)(Main);
