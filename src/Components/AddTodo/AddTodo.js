import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Action/index';
import classes from './AddTodo.css';
import Modal from '../../Components/UI/Modal/Modal';

class AddTodo extends React.Component {

  state = {
    todo: ''
  }

  componentDidMount() {
  }

  inputChangeHandler = (e) => {
    this.setState({todo: e.target.value});
  } 

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTodo(this.state.todo, this.props.userId);
    this.setState({todo: ''})
  }


  render() {
    const inputClasses = [classes.AddTodo];
    this.props.showModal ? inputClasses.push(classes.displayBlock) : inputClasses.push(classes.displayNone);

    const modal = (
        <div className={inputClasses.join(' ')}>
          <Modal value={this.state.todo} onSubmit={this.onSubmit} inputChangeHandler={this.inputChangeHandler} hide={this.props.hide} />
        </div>
      )
    
    return(
      <div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.todos.showModal,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todo, userId) => dispatch(actions.addTodo(todo, userId)),
    onCloseModal: () => dispatch(actions.closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);