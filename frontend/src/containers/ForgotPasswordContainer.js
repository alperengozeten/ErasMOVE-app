import { connect } from 'react-redux';

import ForgotPassword from '../components/ForgotPassword';
import { sendCodeRequest, changePasswordRequest } from '../actions/authActions'
const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {
  sendCodeRequest,
  changePasswordRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
