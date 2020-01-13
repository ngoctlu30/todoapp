import * as actionTypes from '../Action/actionsTypes';

const initialState = {
  todos: [],
  error: false,
  showModal: false,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        todos: action.todos,
        loading: false,
        error: false
      }
    case actionTypes.START_ADD_TODO:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      }
    case actionTypes.MODAL_CLOSE:
      return {
        ...state,
        showModal: false
      }
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        showModal: false,
        ...state,
        todos: [action.todo, ...state.todos],
        loading: false
        
      }
    case actionTypes.ADD_TODO_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    // case actionTypes.START_EDIT_TODO:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // case actionTypes.EDIT_TODO_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     todo: action.newTodo
    //   }
    // case actionTypes.EDIT_TODO_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   }
    case actionTypes.START_DELETE_TODO:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.time !== action) ,
        loading: false
      }
    case actionTypes.DELETE_TODO_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.TOGGLE_TODO:
      console.log(state.todos, action.newTodo)
      return {
        ...state,
        todos: state.todos.map(todo => todo.time === action.newTodo.time ? { ...todo, done: !todo.done} : todo)
      }
    default:
      return state;
    
  }
}

export default reducer;