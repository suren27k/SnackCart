import { useNavigate } from "react-router-dom";
import OrderSuccessImage from "../../assets/icons/order-success.svg";
import Modal from "./Modal";

const OrderStatus = ({ orderId, onClose }) =>
{
	const navigate = useNavigate();

	const goToOrdersPageAction = () =>
	{
		onClose();
		navigate("/profile/orders/");
	}
	return (
		<Modal onClose={onClose}>
			<div className="order-container">
				<div className="order-container--success">
					<img src={OrderSuccessImage} alt="Order success" className="img-fluid" />
					<div className="message">
						<h1>Order Success!</h1>
						<span>Order Id #{orderId}</span>

						<p>Click <a href="#" onClick={goToOrdersPageAction}>here</a> to see details.</p>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default OrderStatus;