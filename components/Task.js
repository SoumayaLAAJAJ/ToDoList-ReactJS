import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';

export default function Task(props) {

  // const [inputEdit, setInputEdit] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [newInput, setNewInput] = useState('');

  // function onNewChange(e){
  //   setNewInput(e.target.value);
  // }

  // const catchNewTaskname = () => {
  //   console.log(newInput);
  //   setIsOpen(false);
  // }


const handleClick = (name) => {
  props.deleteTask(name)
}

// const edit = () => {

//   props.handleEditing();
//   console.log(props.editing);
// }

// function onChange(e){
//   setInputEdit(e.target.value);
// }

// const replaceEdit = () => {
//   const originalTask = props.taskName ;
//   originalTask.replace(props.taskName, newInput);
// }



  return ( 
    // 'taskname' est l'élement qui est repris depuis le composant Task en tant que props
    <div>
      <li> {props.taskName}
        {/* <li>{newInput ? newInput : props.taskName  } */}

        {/* {props.editing === true ? <div>
          <input
        type="text"
        value={inputEdit}
        className="textInput"
        onChange={onChange}
      /> <button type="submit">edit</button></div>: <></>} */}
          
          
        <a>
          <FontAwesomeIcon className='icon' onClick={() => handleClick(props.taskName)} icon={faCircleMinus} />
        </a>
        <a>
          <FontAwesomeIcon className='icon' icon={faFilePen}  onClick={() => setIsOpen(true)}/>
          {isOpen && <Modal update={props.update} taskName={props.taskName} setIsOpen={setIsOpen} />}
        </a>
      </li>
      

    </div>

  )
}
