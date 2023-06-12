import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemHandler, removeItemHandler } from "../../../action";
import AddToCartIcon from "../../../assets/icons/add_cart.svg";
import Modal from "../../UI/Modal";

const ListItem = ({ data }) =>
{
	const [showModal, setShowModal] = useState(false);
	const item = useSelector(state => state.cart.items.find(item => item.id === data.id));
	const dispatcher = useDispatch();

	const increaseCounterByOne = (event) =>
	{
		event.stopPropagation(); //to prevent click on add to cart button opening the modal

		dispatcher(addItemHandler(data));
	};

	const decreaseCounterByOne = (event) =>
	{
		event.stopPropagation();

		dispatcher(removeItemHandler(data.id));
	};
	const handleModal = () =>
	{
		setShowModal((previousState) => !previousState);
	};

	return (
		<>
			<div onClick={handleModal} className={"item-card"}>
				<img className={"img-fluid item-img"} src={`/assets/${data.thumbnail}`} alt={data.title} />
				<div className={"item-card__information"}>


					<div className={"title"}>
						<h3>{data.title}</h3>
					</div>

					<div className={"item-description"}>
						<p>{data.description}</p>
					</div>
					<div className={"pricing"}>
						<span>₹{data.discountedPrice}</span>
						<small>
							<strike>₹{data.price}</strike>
						</small>
					</div>
				</div>
				{
					!item || item?.quantity < 1 ? (	//note "?." operator. It does not throw error if quantity property is not present in item. It simply gives undefined.
						<button className={"cart-add"} onClick={increaseCounterByOne}>
							<span></span>
							<img src={AddToCartIcon} alt="Cart Icon" />
						</button>
					) : (
						<div className="cart-addon">
							<button onClick={decreaseCounterByOne}>
								<span>-</span>
							</button>
							<span>{item.quantity}</span>
							<button onClick={increaseCounterByOne}>
								<span>+</span>
							</button>
						</div>
					)
				}

			</div>
			{showModal && (
				<Modal onClose={handleModal}>
					<div className="item-card__modal">
						<div className="img-wrap">
							<img className={"img-fluid modal-img"} src={`/assets/${data.thumbnail}`} alt={data.title} />
						</div>
						<div className="meta">
							<div className={"modal__information"}>


								<div className={"title"}>
									<h3>{data.title}</h3>
								</div>
								<div className={"modal-description"}>
									<p>{data.description}</p>
								</div>
								<div className={"pricing"}>
									<span>₹{data.discountedPrice}</span>
									<small>
										<strike>₹{data.price}</strike>
									</small>
								</div>
							</div>



							<div className="modal-cart-button">
								{
									!item || item?.quantity < 1 ? (
										<button className={"card-add__modal"} onClick={increaseCounterByOne}>
											<span></span>
											<img src={AddToCartIcon} alt="Cart Icon" />
										</button>
									) : (
										<div className="card-addon card-addon__modal">
											<button onClick={decreaseCounterByOne}>
												<span>-</span>
											</button>
											<span>{item.quantity}</span>
											<button onClick={increaseCounterByOne}>
												<span>+</span>
											</button>
										</div>
									)
								}
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ListItem;
