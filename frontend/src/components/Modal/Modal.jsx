import { createPortal } from "react-dom";
import "./modal.scss"

const Modal = ({ children, onModalClose, showModal }) => {
    
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
			<div className="modal__content">
				{children}
			</div>
		</div>,
		document.getElementById("modal")
	);
};

export default Modal;