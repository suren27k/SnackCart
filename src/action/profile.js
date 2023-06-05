import axios from "axios";
import { API_KEY, BASE_URL } from "./auth";

export const getUserProfileData = (callback) =>
{
	// console.log("inside checkIfLoggedIn")
	return async (dispatch) =>
	{
		try
		{
			let token = localStorage.getItem("token");
			if (!token)
			{
				// console.log("profile.js returning because no token in local storage");
				return;
			}

			//get user data
			const response = await axios.post(`${BASE_URL}accounts:lookup?key=${API_KEY}`, {
				idToken: token
			});


			return callback(response.data);

		}
		catch (error)
		{

			// console.log("error in getUserProfileData: " + error.response);
			// console.log(error)

			// maybe clear idtoken here from local storage if any error occurs.
			// localStorage.removeItem("token");

			return callback({
				error: true,
				status: error.response.status
			});
		}
	}
}

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

			// console.log("response nulss is :")
			// console.log(response)

			if (response.data === null)
			{
				console.log("resp is null")
			}

			return callback({
				error: false,
				data: response.data		//to show order id from firebase in modal
			})
		}
		catch (error)
		{
			// console.log("some error occurred in catch: " + error)
			// console.log(error.response)

			return callback({
				error: true,
				...error.response
			})
		}
	}

}

export const sendDisplayNameChangeRequest = (newName, callback) =>
{
	return async (dispatch) =>
	{
		try
		{
			let token = localStorage.getItem("token");
			if (!token)
			{
				// console.log("profile.js sendDisplayNameChangeRequest returning because no token in local storage");
				return;
			}


			const response = await axios.post(`${BASE_URL}accounts:update?key=${API_KEY}`, {
				displayName: newName,
				idToken: token,
				returnSecureToken: false
			});


			return callback(response);

		}
		catch (error)
		{

			// console.log("error in sendDisplayNameChangeRequest: " + error.response);
			// console.log(error)

			// maybe clear idtoken here from local storage if any error occurs.
			// localStorage.removeItem("token");

			return callback({
				error: true,
				status: error.response.status
			});
		}
	}
}

export const sendEmailVerificationRequest = (callback) =>
{
	return async (dispatch) =>
	{
		try
		{
			let token = localStorage.getItem("token");
			if (!token)
			{
				// console.log("profile.js sendEmailVerificationRequest returning because no token in local storage");
				return;
			}


			const response = await axios.post(`${BASE_URL}accounts:sendOobCode?key=${API_KEY}`, {
				requestType: "VERIFY_EMAIL",
				idToken: token
			});


			return callback(response);

		}
		catch (error)
		{

			// console.log("error in sendEmailVerificationRequest: " + error.response);
			// console.log(error)

			// maybe clear idtoken here from local storage if any error occurs.
			// localStorage.removeItem("token");

			return callback({
				error: true,
				status: error.response.status
			});
		}
	}
}

export const sendAccountDeletionRequest = (callback) =>
{
	return async (dispatch) =>
	{
		try
		{
			let token = localStorage.getItem("token");
			if (!token)
			{
				// console.log("profile.js sendAccountDeletionRequest returning because no token in local storage");
				return;
			}


			const response = await axios.post(`${BASE_URL}accounts:delete?key=${API_KEY}`, {

				idToken: token
			});

			return callback(response);

		}
		catch (error)
		{

			// console.log("error in sendAccountDeletionRequest: " + error.response);
			// console.log(error)

			// maybe clear idtoken here from local storage if any error occurs.
			// localStorage.removeItem("token");

			return callback({
				error: true,
				status: error.response.status,
				code: error.code
			});
		}
	}
}