import { useCallback, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import Modal from "../Modal/Modal";
import { getCroppedImg } from "../../utils/getCroppedImage";
import Button from "../../shared/submitButton/Button";

const ImageCropper = ({ showModal, onModalClose, imgURL, onSaveHandler }) => {
	const [crop, setCrop] = useState({ x: 2, y: 2 });
	const [zoom, setZoom] = useState(1);
	const [croppedArea, setCroppedArea] = useState("");

    useEffect(() => {
        setCrop({ x: 2, y: 2 });
        setZoom(1);
    }, [imgURL])

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(imgURL, croppedArea, 0);
			return croppedImage;
		} catch (error) {
			console.error(error);
		}
	}, [croppedArea, imgURL]);

	return (
		<Modal
			showModal={showModal}
			onModalClose={onModalClose}
		>
			<div className="modal__image-wrapper">
				<Cropper
                    cropShape="round"
					image={imgURL}
					crop={crop}
					zoom={zoom}
					aspect={1}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
            <footer className="modal__footer">
                <Button className="modal__footer-btn" onClick={onModalClose} text="Отмена"/>
                <Button
                    className="modal__footer-btn"
                    onClick={async () => {
                        onSaveHandler(await showCroppedImage());
                        onModalClose();
                    }}
                    text="Сохранить"
                />
			</footer>
		</Modal>
	);
};

export default ImageCropper;
