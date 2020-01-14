import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';
import Layout from './Hoc/Layout/Layout';
import Todos from './Containers/Todos/Todos';
import Signup from './Containers/Signup/Signup';
import Signin from './Containers/Signin/Signin';
import Logout from './Containers/Logout/Logout';
import Homepage from './Containers/Homepage/Homepage';
import * as actions from './Store/Action/index';
import Footer from './Containers/Footer/Footer';

require('dotenv').config();

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
    console.log(process.env)
  }

  render() {
    let route = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Homepage} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/todo" component={Todos} />
          <Route path="/" component={Homepage} />
          <Redirect to="/" />
        </Switch>
      )
    }
    
    return (
      <div className={classes.App} >
        <Layout>
          {route}
        </Layout>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispathToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App);
