import { useState } from "react";
// import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../action/auth";
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
		// alert("logout success!!")
	}

	const userProfileAction = () =>
	{
		// let token = localStorage.getItem("token");
		// if (!token)
		// {
		// 	navigate("/profile");
		// }
		// else
		// {
		// 	alert("Please login to access your profile 123");
		// }

		navigate("/profile");
	}


	return (
		<header>
			<div className="nav-brand">
				<NavLink to={"/"}>
					<span>SnackCart</span>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30"
						height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<circle cx="6" cy="19" r="2" />
						<circle cx="17" cy="19" r="2" />
						<path d="M17 17h-11v-14h-2" />
						<path d="M6 5l14 1l-1 7h-13" />
					</svg>
				</NavLink>
			</div>
			<div className="searchBox-container">
				<SearchBox />
			</div>
			<div className="cart-container">
				<Cart />
			</div>
			{
				<>
					{(() =>
					{
						if (token === null)
						{
							return (
								<button className="login-btn" onClick={loginAction}>Login</button>
							)
						}
						else if (token !== null && authState && authState.idToken)
						{
							return (
								<>
									<div className="user-actions">
										<button onClick={userProfileAction} title="User Profile" className="material-icons">
											<span>Profile</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
												<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
												<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
											</svg>
										</button>
									</div>
									<div className="user-actions">
										<button onClick={logoutAction} title="Logout" className="material-icons">
											<span>Logout</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
												<path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
												<path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
											</svg>
										</button>
									</div>
								</>
							)
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
		</header >
	)
}

export default Header