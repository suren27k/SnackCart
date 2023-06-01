import axios from "axios";

export const getAllOrdersOfUser = (callback) =>
{
	return async (dispatch, getState) =>
	{
		try
		{
			const auth = await getState().auth;

			if (!auth.idToken)
			{
				return;
			}

			//check if currently loggedin
			if (!auth.idToken)
			{
				// console.log("-->inside the if not auth token")
				//to do: if not logged in, show option to take to login page.
				return callback({
					error: true,
					data: {
						error: "Please login to place order."	//data.error hierarhcy is mimiciking friebase hierarchy for error object
					}
				});
			}

			let localId = auth.localId;

			if (auth.localId === undefined)
			{
				localId = auth.users[0].localId;
			}

			if (localId === undefined || auth.idToken === undefined)
			{
				console.log("One of the things is undefined")
			}

			//note: check rules in firebase to undetstand order/id part of url.
			// ".json" is needed for firebase.
			const response = await axios.get(`https://gfg-react-demo-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${localId}.json?auth=${auth.idToken}`);

			return callback({
				error: false,
				data: response.data		//to show order id from firebase in modal
			})
		}
		catch (error)
		{
			console.log("some error occurred in catch: " + error)
			console.log(error.response)
			return callback({
				error: true,
				...error.response
			})
		}
	}

}