import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemHandler, placeOrderRequest, removeItemHandler } from "../../../action";
import Modal from "../../UI/Modal";
import OrderStatus from "../../UI/OrderStatus";
import CartItem from "./CartItem";

const Cart = () =>
{
	const [showModal, setShowModal] = useState(false);
	const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
	const cartItems = useSelector(state => state.cart.items);
	const totalAmount = useSelector(state => state.cart.totalAmount);
	const dispatcher = useDispatch();
	const [orderId, setOrderId] = useState("");

	const handleModalClick = () =>
	{
		setShowModal(previousState => !previousState);
	}

	const handleOrderStatusModal = () =>
	{
		setShowOrderStatusModal(previousState => !previousState);
		setShowModal(false);

	}

	const handleOrderWithRequest = () =>
	{
		// console.log("handleOrderWithRequest called")
		// dispatcher(clearCartHandler());
		dispatcher(placeOrderRequest(response =>
		{
			//callback function

			// console.log("1-->"); console.log(response);
			// console.log("2-->"); console.log(response.data);
			// console.log("3-->"); console.log(response.data.name);


			if (!response.error)
			{
				// console.log("No response error")
				try
				{

					setOrderId(response.data.name);
				}
				catch (error)
				{
					console.log(error)
				}
				handleOrderStatusModal();
			}
			else
			{
				// console.log("Yes response error")
				alert(response.data.error || "Some generic msg incase key missing");
				setShowModal(false);
			}

		}));
	}

	const dispatchToStore = (item, type,) =>
	{

		if (type === 1)
		{
			dispatcher(addItemHandler(item));
		}
		else if (type === -1)
		{
			dispatcher(removeItemHandler(item.id))
		}
	}

	return (
		<>
			<button onClick={handleModalClick}>
				<span data-items={cartItems.length}>Bag</span>
				<i className="bi bi-bag"></i>
			</button>
			{
				showModal &&
				<Modal onClose={handleModalClick} customClass={"cart-modal"}>
					<div className="checkout-modal">
						<h2>Your Bag</h2>
						<div className="checkout-modal_list">
							{cartItems.length === 0 ? (
								<h3 className="empty-cart">Your bag is empty : /</h3>
							)
								: (cartItems.map((cartItem, index) =>
								{
									return (
										<CartItem index={index} cartItem={cartItem} key={cartItem.id} onAddItem={(item) => dispatchToStore(item, 1)} onRemoveItem={(item) => dispatchToStore(item, -1)} />
									)
								}))
							}
						</div>
						{cartItems.length > 0 &&
							<div className="checkout-modal_footer">
								<div className="totalAmount">
									<h4>Total Amount:</h4>
									<h4>₹ {totalAmount} </h4>
								</div>
								<button onClick={handleOrderWithRequest}>Order Now</button>
							</div>
						}

					</div>
				</Modal>
			}
			{
				showOrderStatusModal &&
				<OrderStatus orderId={orderId} onClose={handleOrderStatusModal}></OrderStatus>
			}
		</>
	);
}

export default Cart;