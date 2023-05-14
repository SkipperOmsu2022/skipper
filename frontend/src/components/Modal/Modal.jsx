import { createPortal } from "react-dom";

import "./modal.scss"

const Modal = ({ children, onModalClose, showModal }) => {
    if (showModal) {
        return createPortal(
            <>
                <div
                    className="modal-backdrop"
                    onClick={onModalClose}
                />
                <div className="modal__content">
                    {children}
                </div>
            </>,
            document.getElementById("modal")
        );
    }
};

export default Modal;