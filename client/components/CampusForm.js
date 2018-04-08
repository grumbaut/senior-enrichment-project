import React from 'react';
import { connect } from 'react-redux';
import { postCampus, putCampus, clearError } from '../store';

class CampusForm extends React.Component {
  constructor(props) {
    super(props);
    const campus = this.props.campus;
    this.state = { campus: {
      name: campus ? campus.name : '',
      city: campus ? campus.city : '',
      planet: campus ? campus.planet : '',
      imageUrl: campus ? campus.imageUrl : undefined,
      description: campus ? campus.description : ''
    }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearError(null);
  }

  handleChange(event) {
    this.setState(Object.assign(
      this.state.campus,
      { [event.target.name]: event.target.value })
    );
  }

  render() {
    const { error, campus, post, put } = this.props;
    return (
      <div>
        <h1>{ campus ? 'Edit Campus' : 'Add Campus' }</h1>
        { error ? <p><strong>{ error }</strong></p> : null }
        <form onSubmit={ (event) => campus ? put(event, campus.id, this.state.campus) : post(event, this.state.campus) }>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              className='form-control'
              value={ this.state.campus.name }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City:</label>
            <input
              name='city'
              className='form-control'
              value={ this.state.campus.city }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='planet'>Planet:</label>
            <input
              name='planet'
              className='form-control'
              value={ this.state.campus.planet }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              name='imageUrl'
              className='form-control'
              value={ this.state.campus.imageUrl }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <br />
            <textarea
              name='description'
              rows='5' cols='50'
              value={ this.state.campus.description }
              onChange={ this.handleChange } />
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  error: state.error,
  campus: !match.params.id ? null : state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  post(event, campus) {
    event.preventDefault();
    dispatch(postCampus(campus, history));
  },
  put(event, id, update) {
    event.preventDefault();
    dispatch(putCampus(id, update, history));
  },
  clearError(error) {
    dispatch(clearError(error));
  }
});

export default connect(mapState, mapDispatch)(CampusForm);
