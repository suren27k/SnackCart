import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { loginWithEmailAndPasswordHandler, signUpWithEmailPasswordHandler } from "../../action/auth";
import Loader from "../UI/Loader";


const Login = () =>
{
	// const params = useParams();
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

	let isLoginCase = false;

	const setPageData = () =>
	{
		if (location.pathname === validPaths[0])
		{
			buttonText = "Sign Up";
		}
		else if (location.pathname === validPaths[1])
		{
			buttonText = "Login";
			isLoginCase = true;
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
		// console.log(loginData)
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
					// console.log("error: " + response.error);
					setErrorMessage(response.response.data.error.message);
					setShowErrorMsg(true);
				}
				else
				{
					// console.log("SignUp success!");
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

				// console.log("response in login")
				// console.log(response);

				if (response.error)
				{
					// console.log("error during login: " + response.error);
					// console.log("error msg: " + response.response.data.error.message)
					setErrorMessage(response.response.data.error.message);
					setShowErrorMsg(true);
				}
				else
				{
					// console.log("Login success!");
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
						<NavLink to="/signup"><h3>Sign Up</h3></NavLink>
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
					<div className="auth-signup-prompt">
						{showErrorMsg && <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>}
						{isLoginCase && <p>Don't have an account? Sign up <NavLink to="/signup" >here</NavLink>.</p>}
					</div>
				</div>

			</div>


			{/* <section className="vh-100">
				<div className="container py-5 h-100">
					<div className="row d-flex align-items-center justify-content-center h-100">
						<div className="col-md-8 col-lg-7 col-xl-6">
							<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="img-fluid" alt="Phone image" />
						</div>
						<div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
							<form>

								<div className="form-outline mb-4">
									<input type="email" id="form1Example13" className="form-control form-control-lg" />
									<label className="form-label" for="form1Example13">Email address</label>
								</div>


								<div className="form-outline mb-4">
									<input type="password" id="form1Example23" className="form-control form-control-lg" />
									<label className="form-label" for="form1Example23">Password</label>
								</div>

								<div className="d-flex justify-content-around align-items-center mb-4">


									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
										<label className="form-check-label" for="form1Example3"> Remember me </label>
									</div>
									<a href="#!">Forgot password?</a>
								</div>


								<button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>


							</form>
						</div>
					</div>
				</div>
			</section> */}


			{showLoader && <Loader />}
		</>
	)

}

export default Login;