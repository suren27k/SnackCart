import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../UI/Loader";

const Login = () =>
{
	const params = useParams();
	const location = useLocation();
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});

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

			console.log("valid param!");
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
						<div className="button-wrap">
							<button className="login-btn">
								{buttonText}
							</button>
						</div>
					</form>
				</div>
			</div>
			{loader && <Loader />}
		</>
	)

}

export default Login;