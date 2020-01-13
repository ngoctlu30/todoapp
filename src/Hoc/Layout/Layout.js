import React from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Aux from '../Auxx/Auxx';
import classes from './Layout.css';
class Layout extends React.Component {

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          userEmail={this.props.userEmail}
        />
        <main className={classes.Main}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userEmail: state.auth.userEmail
  }
}

export default connect(mapStateToProps, null) (Layout);