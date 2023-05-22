import { combineReducers } from "redux";
import authReducer from "./authReducer";

const mainReducer = (state = { items: [], totalAmount: 0 }, action) =>
{
	const { type, payload } = action;	// send item in payload

	switch (type)
	{
		case "ADD_ITEM": {

			let items = [...state.items];
			let index = items.findIndex(item => item.id === payload.item.id);

			if (index > -1)
			{
				items[index] = {
					...items[index],
					quantity: items[index].quantity + 1
				};
			}
			else
			{
				items.push({
					...payload.item,	//can also use payload.item
					quantity: 1
				});
			}

			const totalAmount = state.totalAmount + payload.item.discountedPrice;


			return {
				...state,
				items: items,
				totalAmount: totalAmount	//can skip RHS if same name is used for variable as property name in the obj
			}

		}
		case "REMOVE_ITEM": {

			let items = [...state.items];
			let index = items.findIndex(item => item.id === payload.id);

			const totalAmount = state.totalAmount - items[index].discountedPrice;	// doing here because cannot access it after it has been removed from items array.

			if (items[index].quantity === 1)
			{
				items.splice(index, 1);
			}
			else
			{
				items[index] = {
					...items[index],
					quantity: items[index].quantity - 1
				};
			}


			return {
				...state,
				items: items,
				totalAmount: totalAmount
			}

		}
		case "CLEAR_CART": {

			return {
				items: [],
				totalAmount: 0
			}

		}
		default: {
			// console.log("default case in main reducer");

			return state;
		}
	}
}

export default combineReducers({
	cart: mainReducer,
	auth: authReducer
})