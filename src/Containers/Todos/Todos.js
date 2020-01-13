import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/Auxx/Auxx';
import classes from './Todos.css';
import AddTodo from '../../Components/AddTodo/AddTodo';
import * as actions from '../../Store/Action/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Todo from '../../Components/Todo/Todo';

class Todos extends React.Component {

  state = {
    newTodo: null
  }

  componentDidMount = async () => {
    this.props.onFetchData(this.props.userId);
  }
  hideModal = () => {
    this.props.onCloseModal();
  }

  showModal = () => {
    this.props.onShowModal();
  }

  renderTodoList = () => {
    
    let todo = this.props.todos.map(todo => {
      return <Todo 
        key={todo.time}
        todo={todo.todo}
        time={todo.time}
        done={todo.done}
        deleteHandler={() => this.deleteHandler(todo.time)}
        toggleHandler={() => this.props.onToggle(todo.time)}
      />
    })
    return todo;
   
  }

  deleteHandler = (id) => {
    this.props.onDeleteTodo(id, this.props.userId);
  }  
 
  render() {
    return (
        <Aux>
          <AddTodo hide={() => this.hideModal()}   />
          <div className={classes.addTodo}>
            <label onClick={() => this.showModal()}  for="add-toggle" className={classes.add_button}>
              <span className={classes.addTodo_icons}>
              </span>
            </label>
          </div>
          {this.props.loading ? <Spinner /> : this.renderTodoList()}
        </Aux>
        
    )
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.todos.showModal,
    userId: state.auth.userId,
    todos: state.todos.todos,
    loading: state.todos.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowModal: () => dispatch(actions.showModal()),
    onCloseModal: () => dispatch(actions.closeModal()),
    onFetchData: (userId) => dispatch(actions.fetchData(userId)),
    onDeleteTodo: (userId, id) => dispatch(actions.deleteTodo(userId, id)),
    onToggle: (id) => dispatch(actions.toggle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Todos);