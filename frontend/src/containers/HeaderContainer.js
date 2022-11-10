import { connect } from 'react-redux';

import MainLayout from '../layout/MainLayout';

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MainLayout);