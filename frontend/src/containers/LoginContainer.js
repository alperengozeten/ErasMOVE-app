import { connect } from 'react-redux';

import Login from '../components/Login';
import { logInRequest } from '../actions'

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {
  logInRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);