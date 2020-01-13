import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const addTodoStart = () => {
  return {
    type: actionTypes.START_ADD_TODO,
  }
}

export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL
  }
}

export const closeModal = () => {
  return {
    type: actionTypes.MODAL_CLOSE
  }
}

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START
  }
}

export const fetchDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    todos: data
  }
}

export const fetchDataFail = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    error: error
  }
}

export const addTodoSuccess = (todo) => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    todo: todo
  }
}

export const addTodoFail = (error) => {
  return {
    type: actionTypes.ADD_TODO_FAIL,
    error: error
  }
}

export const startDel = () => {
  return {
    type: actionTypes.START_DELETE_TODO
  }
}

export const deleteSuccess = (time) => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS,
    time: time
  }
}

export const deleteFail = (error) => {
  return {
    type: actionTypes.DELETE_TODO_FAIL,
    error: error
  }
}

export const toggleTodo = (todo) => {
  return {
    type: actionTypes.TOGGLE_TODO,
    newTodo: todo
  }
}

export const deleteTodo = (id, userId) => {
  return async dispatch => {
    dispatch(startDel());
    await  axios.get('https://todoapp-68155.firebaseio.com/todo.json')
      .then(res => {
        for(let key in res.data) {
          if(res.data[key].time === id && res.data[key].userId === userId) {
            
            axios.delete('https://todoapp-68155.firebaseio.com/todo/'+ key +'.json')  
              
              .then(res1 => {
                dispatch(fetchData(userId));
                dispatch(deleteSuccess(res.data[key].time))
                
              })
              .catch(err => {
                dispatch(deleteFail());
               console.log(err);
              })
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}


export const addTodo = (todo, userId) => {
  return async dispatch => {
    dispatch(addTodoStart());
    dispatch(showModal());
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*+(7)));

    const data = {
      todo: todo,
      userId: userId,
      time: nd.toLocaleString(),
      done: false
    }
    let url = 'https://todoapp-68155.firebaseio.com/todo.json';
    await axios.post(url, data)
      .then(res => {
        dispatch(addTodoSuccess(JSON.parse(res.config.data).todo));
        dispatch(closeModal());
        dispatch(fetchData(userId));
        
      })
      .catch(err => {
        dispatch(addTodoFail(err));
        dispatch(closeModal());
      })
  }
}

export const toggle = (id) => async dispatch => {
  await axios.get('https://todoapp-68155.firebaseio.com/todo.json')
    .then(res => {
      for(let key in res.data) {
        if(res.data[key].time === id) {
          axios.patch(`https://todoapp-68155.firebaseio.com/todo/${key}.json`, {
            ...res.data[key], done: !res.data[key].done
          }).then(res => {
            
            dispatch(toggleTodo(res.data))
          })
        }
      }
    })
}

export const fetchData = (userId) => async dispatch => {
    dispatch(fetchDataStart())
    await axios.get('https://todoapp-68155.firebaseio.com/todo.json')
      .then(res => {
        const fetchData = [];
        for(let key in res.data) {
          if(res.data[key].userId === userId) {
            fetchData.push({...res.data[key]})
          }
        }
        dispatch(fetchDataSuccess(fetchData.reverse()));
      })
      .catch(err => {
        dispatch(fetchDataFail(err));
      })
  }
