import axios from "axios"
import { getCurrentDate } from "../mixins/DateUtil"

export const addItemHandler = (item) =>
{
	return dispatch =>
	{
		dispatch({
			type: "ADD_ITEM",
			payload: {
				item: item
			}
		})
	}
}

export const removeItemHandler = (id) =>
{
	return dispatch =>
	{
		dispatch({
			type: "REMOVE_ITEM",
			payload: {
				id: id
			}
		})
	}
}


export const clearCartHandler = () =>
{
	return dispatch =>
	{
		dispatch({
			type: "CLEAR_CART",
		})
	}
}

export const placeOrderRequest = (callback) =>
{
	// note getState is a function that returns the entire state object
	return async (dispatch, getState) =>
	{
		try
		{
			const { auth, cart } = getState();

			//check if currently loggedin
			if (!auth.idToken)
			{
				console.log("inside the if not uaht token")
				//to do: if not logged in, show option to take to login page.
				return callback({
					error: true,
					data: {
						error: "Please login to place order."	//data.error hierarhcy is mimiciking friebase hierarchy for error object
					}
				});
			}

			const orderedOn = getCurrentDate(new Date());


			//note: check rules in firebase to undetstand order/id part of url.
			// ".json" is needed for firebase.
			const response = await axios.post(`https://gfg-react-demo-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${auth.localId}.json?auth=${auth.idToken}`,
				{
					...cart,		//payload to save in db
					orderedOn
				});
			//once order request is successful, clear the cart in UI.
			dispatch({
				type: "CLEAR_CART"
			});


			return callback({
				error: false,
				data: response.data		//to show order id from firebase in modal
			})
		}
		catch (error)
		{
			console.log("some error occurred in catch: " + error)
			return callback({
				error: true,
				...error.response
			})
		}
	}
}

export const getAllOrdersOfUser = (callback) =>
{
	console.log("inside getAllOrdersOfUser")
	return async (dispatch, getState) =>
	{
		try
		{
			const auth = await getState().auth;

			console.log("auth idtoken: " + auth.idToken);

			let token = localStorage.getItem("token");
			if (!token)
			{
				return;
			}

			console.log("localstorage idtoken: " + token);

			// setTimeout(() =>
			// {
			// 	console.log("auth idtoken: later : " + auth.idToken);
			// }, 3000);

			//check if currently loggedin
			if (!token)
			{
				console.log("inside the if not auth token")
				//to do: if not logged in, show option to take to login page.
				return callback({
					error: true,
					data: {
						error: "Please login to place order."	//data.error hierarhcy is mimiciking friebase hierarchy for error object
					}
				});
			}
			else
			{
				console.log("localstorage token is present.")
			}


			//note: check rules in firebase to undetstand order/id part of url.
			// ".json" is needed for firebase.
			const response = await axios.get(`https://gfg-react-demo-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${auth.localId}.json?auth=${auth.idToken}`);

			return callback({
				error: false,
				data: response.data		//to show order id from firebase in modal
			})
		}
		catch (error)
		{
			console.log("some error occurred in catch: " + error)
			return callback({
				error: true,
				...error.response
			})
		}
	}

}