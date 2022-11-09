import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);