import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../Store/Action/index';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  
  render() {
    return <Redirect to="/" />
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);