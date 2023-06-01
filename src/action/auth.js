import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/";
const API_KEY = "AIzaSyD5I97D1icojKp86dSrk-rrcbVSyHsQLkA";

//this is a thunk outer function
export const signUpWithEmailPasswordHandler = (loginData, callback) =>
{
	//this is the inner thunk function which is asynchronous
	return async (dispatch) =>	//async is possible here because of thunk
	{
		try
		{
			const response = await axios.post(`${BASE_URL}accounts:signUp?key=${API_KEY}`, {
				email: loginData.email,
				password: loginData.password,
				returnSecureToken: true
			});

			// console.log("1:" + response);
			dispatch({
				type: "SIGNUP",
				payload: response.data
			});
			localStorage.setItem("token", response.data.idToken);
			return callback(response.data);

		}
		catch (error)
		{

			// console.log("error: " + error.response);

			return callback({
				error: true,
				response: error.response
			});
		}
	}

}

export const loginWithEmailAndPasswordHandler = (loginData, callback) =>
{
	return async (dispatch) =>
	{
		try
		{
			const response = await axios.post(`${BASE_URL}accounts:signInWithPassword?key=${API_KEY}`, {
				email: loginData.email,
				password: loginData.password,
				returnSecureToken: true
			});

			// console.log("1:" + response);
			dispatch({
				type: "LOGIN",
				payload: response.data
			});
			localStorage.setItem("token", response.data.idToken);
			return callback(response.data);

		}
		catch (error)
		{

			// console.log("error: " + error.response);

			return callback({
				error: true,
				response: error.response
			});
		}
	}
}

//use token from previous login and send a login request again to keep user logged in.
export const checkIfLoggedIn = (callback) =>
{
	// console.log("inside checkIfLoggedIn")
	return async (dispatch) =>
	{
		try
		{
			let token = localStorage.getItem("token");
			if (!token)
			{
				// return callback({
				// 	error: true,
				// 	status: 404
				// })
				return;
			}

			//get user data
			const response = await axios.post(`${BASE_URL}accounts:lookup?key=${API_KEY}`, {
				idToken: token
			});

			// console.log(response)

			//send login request
			dispatch({
				type: "LOGIN",
				payload: {
					idToken: token,
					...response.data
				}
			});

			return callback(response.data);

		}
		catch (error)
		{

			// console.log("error: " + error.response);
			// console.log(error)

			return callback({
				error: true,
				status: error.response.status
			});
		}
	}
}

export const logout = () =>
{
	return dispatch =>
	{
		localStorage.removeItem("token");
		dispatch({
			type: "CLEAR_CART"
		});
		dispatch({
			type: "LOGOUT"
		});
	}
}