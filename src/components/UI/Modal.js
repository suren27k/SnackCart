import ReactDOM from "react-dom";
import { Overlay } from "./Loader";

const Modal = ({ onClose, customClass, children }) =>
{
	return ReactDOM.createPortal(
		<>
			<Overlay onClose={onClose} />
			<div className={`modal ${customClass}`}>
				<button type="close" onClick={onClose}>
					<i className="bi bi-x-lg"></i>
				</button>
				<div className="content">{children}</div>
			</div>
		</>,
		document.getElementById("modal-root")
	);
};

export default Modal;
