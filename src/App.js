// import 'bootstrap/dist/css/bootstrap.min.css';
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { checkIfLoggedIn, expireSession } from "./action/auth";
import Error404 from "./components/Error/Error404";
import Header from "./components/Layout/Header";
import Login from "./components/Login";
import Products from "./components/Products/Products";
import Orders from "./components/UserProfiles/Orders";
import Profile from "./components/UserProfiles/Profile";


const App = () =>
{
	const dispatcher = useDispatch();
	const authState = useSelector(state => state.auth);
	const [isAuthDone, setIsAuthDone] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// console.log("inside app js")
	let token = localStorage.getItem("token");

	useLayoutEffect(() =>
	{

		// console.log("inside useeffect app js token: ")
		// console.log("token is: " + token)

		if (token === null)
		{
			// console.log("Not going inside dispatch checkIfLoggedIn")
			// console.log("calling expire session from app js if")
			dispatcher(expireSession());
			setIsAuthDone(true);
			return;
		}
		else if (token !== null)
		{
			// console.log("inside else")
			dispatcher(checkIfLoggedIn((resp) =>
			{
				// console.log("inside callback in app js --> location is: " + location.pathname);

				// console.log(resp);

				if (resp.error && (location.pathname === "/profile/info" || location.pathname === "/profile/orders"))
				{
					if (resp.status === 400 && resp.message === "INVALID_ID_TOKEN")
					{
						alert("Session expired. Please login again to continue...");
						dispatcher(expireSession());
						navigate("/login");
					}
					else if (resp.status === 400)
					{
						alert("Session expired. Please login again to continue...");
						dispatcher(expireSession());
						navigate("/login");
					}
					else if (resp.status === 401)
					{
						alert("Session expired. Please login again to continue...");
						dispatcher(expireSession());
						navigate("/login");
					}
					else if (resp.status === 404)
					{
						alert("Please login to access this page");
						navigate("/login");
					}

				}
				else if (resp.error)
				{
					console.log("error in checking if user is logged in");
					// console.log("error code: " + resp.status);
					// alert("handle this error")
					// navigate("/login");
				}
				setIsAuthDone(true);
			}))
		}

	}, [token]);

	return (
		<div>
			{
				isAuthDone &&
				(
					<>
						<Header />
						<Routes>
							{
								!authState.idToken &&
								<>
									<Route path="/login" element={<Login />} />
									<Route path="/signup" element={<Login />} />
								</>
							}

							<Route path="/" element={<Products key="products" />}>
								<Route path="category/:category" element={<Products key="products-category" />} />
							</Route>
							<Route path="/profile/info" element={<Profile isAuthDone={isAuthDone} key="profile-info" />} />

							<Route path="/profile" element={<Navigate to="/profile/info" replace />} />
							<Route path="/profile/orders" element={<Orders isAuthDone={isAuthDone} key="profile-orders" />} />

							<Route path="/404" element={<Error404 />} />
							<Route
								path="*"
								element={<Navigate to="/" replace />}
							/>
						</Routes>
					</>)
			}


		</div>
	);
}

export default App;