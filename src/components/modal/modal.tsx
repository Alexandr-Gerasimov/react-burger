import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals")!

const Modal = ({onClick, onKeyDown, children}) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])
  return createPortal(
    (<>
      <div className={styles.modal}>
        <button className={styles.modalClose} type='button'><CloseIcon type='primary' onClick={onClick}/></button>
        {children}
      </div>
      <ModalOverlay onClick={onClick}/>
    </>),
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;