import { connect } from 'react-redux';

import Header from '../components/Header';

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Header);