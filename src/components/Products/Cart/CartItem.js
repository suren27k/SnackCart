const CartItem = ({ index, cartItem, onAddItem, onRemoveItem }) =>
{

	return (<div className="checkout-modal_list-item">
		<div className="item-number">
			<div>{index + 1}</div>
		</div>
		<div className="img-wrap">
			<img className="img-fluid cart-img" src={`/assets/${cartItem.thumbnail}`} alt={cartItem.title} />
		</div>
		<div className="information">
			<div className="item-info">
				<h4>{cartItem.title}</h4>
				<div className="pricing">
					<span>₹ {cartItem.discountedPrice}</span>
					<small>
						<strike>₹ {cartItem.price}</strike>
					</small>
				</div>
			</div>
			<div className="cart-addon cart-addon__modal">
				<button onClick={() => onRemoveItem(cartItem)}>-</button>
				<span className="counter">{cartItem.quantity}</span>
				<button onClick={() => onAddItem(cartItem)}>+</button>

			</div>
		</div>
	</div>);
}

export default CartItem;