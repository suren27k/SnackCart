import { useState } from "react";
// import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { expireSession, logout } from "../../action/auth";
import Cart from "../Products/Cart/Cart";
import SearchBox from "../UI/SearchBox";
const Header = () =>
{
	const navigate = useNavigate();
	const authState = useSelector(state => state.auth);
	const dispatcher = useDispatch();
	const [showAlert, setShowAlert] = useState(false);
	const token = localStorage.getItem("token");

	// console.log("token: " + token);
	const loginAction = () =>
	{
		navigate("/login");
	}

	const logoutAction = () =>
	{
		dispatcher(logout());

		// loginAction();
		setShowAlert(true);
		alert("You have been logged out!")
	}

	const userProfileAction = () =>
	{
		navigate("/profile/info");
	}


	return (
		<header>
			<div className="nav-brand">
				<NavLink to={"/"}>
					<span>SnackCart</span>
					<i className="bi bi-cart3"></i>
				</NavLink>
			</div>
			<div className="searchBox-container">
				<SearchBox />
			</div>
			<div className="nav-actions">
				<div className="user-actions cart-container">
					<Cart />
				</div>
				{
					<>
						{(() =>
						{
							if (token === null)
							{
								return (
									<div className="user-actions login-action">
										<button onClick={loginAction}>Login</button>
									</div>
								)
							}
							else if (token !== null && authState && authState.idToken)
							{
								return (
									<>
										<div className="user-actions profile-action">
											<button onClick={userProfileAction} title="User Profile" className="material-icons">
												<span>Profile</span>
												<i className="bi bi-person-circle"></i>
											</button>
										</div>
										<div className="user-actions logout-action">
											<button onClick={logoutAction} title="Logout" className="material-icons">
												<span>Logout</span>
												<i className="bi bi-box-arrow-right"></i>
											</button>
										</div>
									</>
								)
							}
							else if (token === null && !authState && !authState.idToken)
							{
								console.log("CALLING expire session from header js if token: " + token)
								dispatcher(expireSession());
							}

						})()}


					</>}
				{/* <Alert variant={"primary"} show={showAlert} onClose={() => setShowAlert(false)} dismissible>
				Logout Success!!
			</Alert> */}
				{/* {showAlert &&
				ReactDOM.createPortal(
					<>
						<Alert variant={"primary"} show={showAlert} onClose={() => setShowAlert(false)} dismissible>
							Logout Success 1234!!
						</Alert>
					</>,
					document.getElementById("modal-root")
				)
			} */}
			</div>

		</header >
	)
}

export default Header