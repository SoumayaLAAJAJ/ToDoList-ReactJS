// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";

const Modal = ({ setIsOpen,update, taskName }) => {
  const [newInput, setNewInput] = useState('');

  // function onNewChange(e){
  //   setNewInput(e.target.value);
  // }

  const catchNewTaskname = () => {
    update(taskName, newInput);
    // console.log(taskName,newInput);
    setIsOpen(false);
  }
  function onNewChange(e){
    setNewInput(e.target.value);
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Update the task</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {/* INPUT newTaskName */}
            <input placeholder="New todo" onChange={onNewChange} value={newInput}/>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              {/* BUTTON UPDATE */}
              <button
                type="submit"
                className={styles.cancelBtn}
                onClick={catchNewTaskname}
              >
                Update
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
