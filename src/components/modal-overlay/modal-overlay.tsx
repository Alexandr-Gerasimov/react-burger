import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { FC } from "react";

type TModalOverlay = {
  onClick: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
