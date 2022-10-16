import { connect } from 'react-redux';
import App from '../components/App';

import { getAppText } from '../selectors';
import { initApp } from '../actions';

const mapStateToProps = state => {
  const appText = getAppText(state);
  return {
    appText,
  };
};

const mapActionsToProps = {
  initApp,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
