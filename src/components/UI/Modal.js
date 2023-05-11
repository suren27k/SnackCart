import ReactDOM from "react-dom";
import { Overlay } from "./Loader";

const Modal = ({ onClose, children }) =>
{
	return ReactDOM.createPortal(
		<>
			<Overlay onClose={onClose} />
			<div className="modal">
				<button type="close" onClick={onClose}>X</button>
				<div className="content">{children}</div>
			</div>
		</>,
		document.getElementById("modal-root")
	);
};

export default Modal;
