import React from 'react';

import classes from './Todo.css';
import EditIcon from '../../Assest/Image/Image/edit.png';
import DelIcon from '../../Assest/Image/Image/delete.png'

const todo = (props) => {
  
  return (
    <div     
      className={!props.done ? [classes.Todo] : [classes.Todo, classes.bgDone].join(" ")}>
      


      <div className={classes.canToggle} onClick={props.toggleHandler}>
        <div  className={classes.infor}>
          <div>{props.todo}</div>
          <div>{props.time}</div>
        </div>
        <div className={ props.done ? classes.Done : null}>
          <span className={classes.lineDone}></span>
        </div>
      </div>

      <div className={classes.action}>
        <img onClick={props.deleteHandler} src={DelIcon} />
      </div>
      
    </div>
  )
}

export default todo;