import React from 'react';

import classes from './Todo.css';
import EditIcon from '../../Assest/Image/Image/edit.png';
import DelIcon from '../../Assest/Image/Image/delete.png'

const todo = (props) => {
  
  return (
    <div className={classes.Todo}>
      <div className={classes.canToggle} onClick={props.toggleHandler}>
        <div style={{
          textDecoration: props.done ? 'line-through' : 'none'
        }}  className={classes.infor}>
          <div>{props.todo}</div>
          <div>{props.time}</div>
        </div>
      </div>

      <div className={classes.action}>
        <img onClick={props.deleteHandler} src={DelIcon} />
      </div>
      
    </div>
  )
}

export default todo;