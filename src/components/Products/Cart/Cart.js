import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemHandler, clearCartHandler, placeOrderRequest, removeItemHandler } from "../../../action";
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

	const handleOrder = () =>
	{
		dispatcher(clearCartHandler());
		handleOrderStatusModal();
	}

	const handleOrderWithRequest = () =>
	{
		console.log("handleOrderWithRequest called")
		// dispatcher(clearCartHandler());
		dispatcher(placeOrderRequest(response =>
		{
			//callback function

			// console.log("1-->"); console.log(response);
			// console.log("2-->"); console.log(response.data);
			// console.log("3-->"); console.log(response.data.name);


			if (!response.error)
			{
				console.log("No response error")
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
				console.log("Yes response error")
				alert(response.data.error || "Some generic msg incase key missing");
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
				<span data-items={cartItems.length}>Cart</span>
				<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="6" cy="19" r="2" />
					<circle cx="17" cy="19" r="2" />
					<path d="M17 17h-11v-14h-2" />
					<path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
					<path d="M15 6h6m-3 -3v6" />
				</svg>
			</button>
			{
				showModal &&
				<Modal onClose={handleModalClick}>
					<div className="checkout-modal">
						<h2>Your Cart</h2>
						<div className="checkout-modal_list">
							{cartItems.length === 0 ? (
								<h3 className="empty-cart">Your cart is empty : /</h3>
							)
								: (cartItems.map((cartItem) =>
								{
									return (
										<CartItem cartItem={cartItem} key={cartItem.id} onAddItem={(item) => dispatchToStore(item, 1)} onRemoveItem={(item) => dispatchToStore(item, -1)} />
									)
								}))
							}
						</div>
						{cartItems.length > 0 &&
							<div className="checkout-modal_footer">
								<div className="totalAmount">
									<h4>Total Amount</h4>
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