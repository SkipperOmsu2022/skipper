import { createPortal } from "react-dom";
import { useEffect } from "react"

import "./modal.scss"

const hideYScroll = () => {
    document.body.style.height = '100%';
    document.body.style.overflowY = 'hidden';
}
const showYScroll = () => {
    document.body.style.height = '%';
    document.body.style.overflowY = '';
}

const Modal = ({ children, onModalClose, showModal }) => {
    useEffect(() => {
        if (showModal) {
            hideYScroll()
        } else {
            showYScroll()
        }
        return showYScroll;
    }, [showModal])
    
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