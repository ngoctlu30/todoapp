import React from 'react';
import { connect } from 'react-redux';

import Input from '../../Components/UI/Input/Input';
import { checkValidation } from '../../Share/utility';
import * as actions from '../../Store/Action/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

import classes from './Signin.css';

class Signin extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 12
        },
        valid: false,
        touched: false
      }
    }
  }

  componentDidMount() {
    if(this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updateFormSignUp = {
      ...this.state.controls
    }

    const updateFormElement = {
      ...updateFormSignUp[controlName]
    }

    updateFormElement.value = event.target.value;
    updateFormElement.valid = checkValidation(event.target.value, this.state.controls[controlName].validation );
    updateFormElement.touched = true;
    updateFormSignUp[controlName] = updateFormElement;
    this.setState({
      controls: updateFormSignUp
    })
  }

  SubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  } 

  render() {
    const formElementArray = [];

    for(let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    if(this.props.loading) {
      form = <Spinner />
    }
    
      let errorMessage = null;
      if(this.props.error) {
        errorMessage = (
        <p className={classes.ErrMes}>{this.props.error.message}</p>
        )
      }

    return (
      <div>
        
        <form className={classes.Form} onSubmit={this.SubmitHandler} >
        {errorMessage}
          <span className={classes.Title}>Sign In</span>
          {form}
          <a href="/signup">Create a new account?</a>
          <button  type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authSignIn(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);