import { createPortal } from "react-dom";
import { useEffect } from "react"

import "./modal.scss"

const hideYScroll = () => {
    document.body.style.height = '100%';
    document.body.style.overflowY = 'hidden';
}
const showYScroll = (deep) => {
    if (!deep) {
        document.body.style.height = '%';
        document.body.style.overflowY = '';
    }
}

const Modal = ({ children, onModalClose, showModal, deep }) => {
    useEffect(() => {
        if (showModal) {
            hideYScroll()
        } else {
            showYScroll(deep)
        }

        return () => showYScroll(deep);
    }, [showModal])
    
    if (showModal) {
        return createPortal(
            <>
                <div
                    className={`modal-backdrop ${deep || ""}`}
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