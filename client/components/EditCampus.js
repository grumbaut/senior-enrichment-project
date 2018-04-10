import React from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../store';

class EditCampus extends React.Component {
  constructor(props) {
    super(props);
    const campus = this.props.campus;
    this.state = {
      name: campus ? campus.name : '',
      city: campus ? campus.city : '',
      planet: campus ? campus.planet : '',
      imageUrl: campus ? campus.imageUrl : undefined,
      description: campus ? campus.description : '',
      touched: {
        name: false,
        city: false,
        planet: false,
        description: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
  }

  handleBlur(field) {
    const touched = Object.assign(this.state.touched, { [field]: true });
    this.setState({ touched });
  }

  validate(name, city, planet, description) {
    return {
      name: name.length === 0,
      city: city.length === 0,
      planet: planet.length === 0,
      description: description.length === 0
    };
  }

  render() {
    const { put, campus } = this.props;
    const { name, city, planet, imageUrl, description, touched } = this.state;
    const errors = this.validate(name, city, planet, description);

    const showError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const isEnabled = !Object.keys(errors).some(key => errors[key]);

    return (
      <div>
        <h1>Edit Campus</h1>
        <form onSubmit={ event => put(event, campus.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              className={ showError('name') ? 'error form-control' : 'form-control'}
              value={ name }
              onBlur={ () => this.handleBlur('name')}
              onChange={ this.handleChange } />
            { errors.name && touched.name ? <p className='error'>Please provide a name.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City:</label>
            <input
              type='text'
              name='city'
              className={ showError('city') ? 'error form-control' : 'form-control'}
              value={ city }
              onBlur={ () => this.handleBlur('city')}
              onChange={ this.handleChange } />
            { errors.city && touched.city ? <p className='error'>Please provide a city.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='planet'>Planet:</label>
            <input
              type='text'
              name='planet'
              className={ showError('planet') ? 'error form-control' : 'form-control'}
              value={ planet }
              onBlur={ () => this.handleBlur('planet')}
              onChange={ this.handleChange } />
            { errors.planet && touched.planet ? <p className='error'>Please provide a planet.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              type='text'
              name='imageUrl'
              className='form-control'
              value={ imageUrl }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <br />
            <textarea
              className={ showError('description') ? 'error' : '' }
              name='description'
              rows='5' cols='50'
              value={ description }
              onBlur={ () => this.handleBlur('description')}
              onChange={ this.handleChange } />
            { errors.description && touched.description ? <p className='error'>Please provide a description.</p> : null }
          </div>
          <button disabled={ !isEnabled } type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='button-margin btn btn-outline-success' onClick={ this.goBack }> Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  campus: state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update) {
    event.preventDefault();
    dispatch(putCampus(id, update, history));
  },
});

export default connect(mapState, mapDispatch)(EditCampus);
