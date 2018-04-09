import React from 'react';
import { connect } from 'react-redux';
import { putCampus, clearError } from '../store';

class EditCampus extends React.Component {
  constructor(props) {
    super(props);
    const campus = this.props.campus;
    this.state = {
      name: campus ? campus.name : '',
      city: campus ? campus.city : '',
      planet: campus ? campus.planet : '',
      imageUrl: campus ? campus.imageUrl : undefined,
      description: campus ? campus.description : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.campus) {
      if(this.state.name !== nextProps.campus.name) {
        this.setState(nextProps.campus);
      }
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if(this.props.error.length) {
      this.props.clear();
    }
  }

  render() {
    const { error, campus, put } = this.props;
    if(!campus) return null;
    return (
      <div>
        <h1>Edit Campus</h1>
        <ul className='error'>
          { error.map(err => (
            <li key={ err }>
              { err }
            </li>
          )) }
        </ul>
        <form onSubmit={ (event) => put(event, campus.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              className='form-control'
              value={ this.state.name }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City:</label>
            <input
              type='text'
              name='city'
              className='form-control'
              value={ this.state.city }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='planet'>Planet:</label>
            <input
              type='text'
              name='planet'
              className='form-control'
              value={ this.state.planet }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              type='text'
              name='imageUrl'
              className='form-control'
              value={ this.state.imageUrl }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <br />
            <textarea
              name='description'
              rows='5' cols='50'
              value={ this.state.description }
              onChange={ this.handleChange } />
          </div>
          <button type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='btn btn-outline-success' onClick={ this.goBack }> Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  error: state.error,
  campus: state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update) {
    event.preventDefault();
    dispatch(putCampus(id, update, history));
  },
  clear() {
    dispatch(clearError());
  }
});

export default connect(mapState, mapDispatch)(EditCampus);
