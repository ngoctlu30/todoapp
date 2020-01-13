import React from 'react';

import classes from './Modal.css';

const modal = (props) => {
  return (
    <div>
      <label onClick={props.hide}  className={classes.X_button}>
        <span className={classes.X_icon}></span>
      </label>
      <div className={classes.AddTodo_Form} >
        <input value={props.value} onChange={(e) => props.inputChangeHandler(e)} name="name" id="name" className={classes.AddTodo_Form_input} placeholder="Todo"/>
        <label for="name" className={classes.AddTodo_Form_label} >Write todo</label>
      </div>
      <div className={classes.AddTodo_Buttons}>
        <button onClick={(e) => props.onSubmit(e)} className={classes.btn}>Save</button>
        <button  className={classes.btn}>Cancel</button>
      </div>
    </div>
  )
} 

export default modal;