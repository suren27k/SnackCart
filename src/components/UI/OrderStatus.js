import OrderSuccessImage from "../../assets/icons/order-success.svg";
import Modal from "./Modal";

const OrderStatus = ({ orderId, onClose }) =>
{
	return (
		<Modal onClose={onClose}>
			<div className="order-container">
				<div className="order-container--success">
					<img src={OrderSuccessImage} alt="Order success" className="img-fluid" />
					<div className="message">
						<h1>Order Success!</h1>
						<span>Order Id #{orderId}</span>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default OrderStatus;