import React from 'react';
import { connect } from 'react-redux';
import { postCampus, gotError } from '../store';

class NewCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.setError(null);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div>
        <h3>Create Campus</h3>
        {
          this.props.error && <p><strong>{ this.props.error }</strong></p>
        }
        <form onSubmit={ (event) => this.props.post(event, this.state.input)}>
          <input value={ this.state.input } onChange={ this.handleChange } />
          <button>Add Campus</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  error: state.error
});

const mapDispatch = (dispatch, { history }) => ({
  post(event, name) {
    event.preventDefault();
    dispatch(postCampus(name, history));
  },
  setError(error) {
    dispatch(gotError(error));
  }
});

export default connect(mapState, mapDispatch)(NewCampus);
