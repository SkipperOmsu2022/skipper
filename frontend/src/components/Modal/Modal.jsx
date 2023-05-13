import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

import "./modal.scss"

const Modal = ({ children, onModalClose, showModal }) => {
    const ref = useRef(null);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onModalClose();
        }
    };
    
	return createPortal(
		<div
            className="modal"
			style={{
				opacity: showModal ? 1 : 0,
				pointerEvents: showModal ? "all" : "none",
			}}
		>
			<div
				onClick={onModalClose}
				role="button"
				className="iu-modal-backdrop"
				style={{
					display: showModal ? "flex" : "none",
				}}
			/>
			<div className="modal__content" ref={ref}>
				{children}
			</div>
		</div>,
		document.getElementById("modal")
	);
};

export default Modal;