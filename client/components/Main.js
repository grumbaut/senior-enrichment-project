import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCampuses, getStudents } from '../store';

import Nav from './Nav';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import NewCampus from './NewCampus';
import NewStudent from './NewStudent';
import Student from './Student';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Nav />
            <div className='container-fluid'>
              <Switch>
                <Route path='/students/:id' component={ Student } />
                <Route path='/students' component={ Students } />
                <Route path='/campuses' component={ Campuses } />
                <Route path='/addcampus' component={ NewCampus } />
                <Route path='/addstudent' component={ NewStudent } />
                <Route exact path='/' component={ Home } />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </div>
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
