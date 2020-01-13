import React from 'react';

import { connect } from 'react-redux';
import classes from './Homepage.css';

class Homepage extends React.Component {
  render () {
    return (
      <div className={classes.Homepage}>
        {!this.props.isAuthenticated ?
         (<h1 className={classes.Content}>WellCome My Todo App</h1>) : 
         (<a className={classes.Content} href="/todo">Use immediately &rarr;</a>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, null)(Homepage);