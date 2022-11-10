import { connect } from 'react-redux';

import Login from '../components/Auth/Login';
import { logInRequest } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  logInRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);