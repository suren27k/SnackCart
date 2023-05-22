import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { loginWithEmailAndPasswordHandler, signUpWithEmailPasswordHandler } from "../../action/auth";
import Loader from "../UI/Loader";

const Login = () =>
{
	const params = useParams();
	const location = useLocation();
	const [showLoader, setShowLoader] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [showErrorMsg, setShowErrorMsg] = useState(false);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});
	const dispatcher = useDispatch();

	// console.table("loc1:" + location);
	// Object.entries(location)
	// Object.entries(location).forEach(keyValuePair => { console.log(" -->  ", ...keyValuePair) })

	const validPaths = ["/signup", "/login"];

	let buttonText = "";

	const setPageData = () =>
	{
		if (location.pathname === validPaths[0])
		{
			buttonText = "Sign Up";
		}
		else if (location.pathname === validPaths[1])
		{
			buttonText = "Login";
		}
	}

	const validateURL = () => 
	{

		// console.log("validPaths : " + validPaths + " --> actual param: " + location.pathname);

		if (validPaths.includes(location.pathname))
		{

			// console.log("valid param!");
			// navigate(location.pathname);
			setPageData();
		}
		else
		{
			// console.log("INvalid param!");
			navigate("/404");
		}
		// console.log("validateURL:" + params);
	}
	validateURL();

	// console.log(params);

	const handleLoginAction = (e) =>
	{
		e.preventDefault();
		console.log(loginData)
		if (location.pathname === "/signup")
		{
			setShowErrorMsg(false);
			setShowLoader(true);
			dispatcher(signUpWithEmailPasswordHandler(loginData, (response) =>
			{
				//this function will be executed in auth.js when callback() is called.
				//For now, it is being passed to auth.js, not executed.


				if (response.error)
				{
					console.log("error: " + response.error);
					setErrorMessage(response.response.data.error.message);
					setShowErrorMsg(true);
				}
				else
				{
					console.log("SignUp success!");
					navigate("/", { replace: true });	//replaces existing url instead of adding a new one.
				}

				setShowLoader(false);

			}));
		}
		else if (location.pathname === "/login")
		{
			setShowErrorMsg(false);
			setShowLoader(true);
			dispatcher(loginWithEmailAndPasswordHandler(loginData, (response) =>
			{
				//this function will be executed in auth.js when callback() is called.
				//For now, it is being passed to auth.js, not executed.


				if (response.error)
				{
					console.log("error: " + response.error);
					setErrorMessage(response.response.data.error.message);
					setShowErrorMsg(true);
				}
				else
				{
					console.log("Login success!");
					navigate("/", { replace: true });	//replaces existing url instead of adding a new one.
				}

				setShowLoader(false);

			}));
		}
	}

	const handleInput = (e) =>
	{
		// console.log("handleinput: " + e.target.value);
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}

	return (
		<>
			<div className="auth-container">
				<div className="auth-container--box">
					<div className="tab-selector">
						<NavLink to="/login"><h3>Login</h3></NavLink>
						<NavLink to="/signup"><h3>Signup</h3></NavLink>
					</div>
					<form autoComplete={"off"} onSubmit={handleLoginAction}>
						<div className="input-wrap">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								placeholder="Enter Email"
								value={loginData.email}
								onChange={handleInput}
							/>
						</div>
						<div className="input-wrap">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Enter Password"
								value={loginData.password}
								onChange={handleInput}
							/>
						</div>
						{showErrorMsg && <p style={{ color: "red", fontSize: "11px" }}>{errorMessage}</p>}
						<div className="button-wrap">
							<button className="login-btn">
								{buttonText}
							</button>
						</div>
					</form>
				</div>
			</div>
			{showLoader && <Loader />}
		</>
	)

}

export default Login;