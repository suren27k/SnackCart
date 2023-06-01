// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "./action/auth";
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

	useEffect(() =>
	{
		let token = localStorage.getItem("token");
		if (!token)
		{
			console.log("Not going inside dispatch checkIfLoggedIn")
			return;
		}
		else
		{
			// console.log("inside else")
			dispatcher(checkIfLoggedIn((resp) =>
			{
				// console.log("inside callback in app js --> location is: " + location.pathname);

				// console.log(resp);

				if (resp.error && (location.pathname === "/profile/info" || location.pathname === "/profile/orders"))
				{
					if (resp.status === 400)
					{
						alert("Please login to access this page.");
						localStorage.removeItem("token");
						navigate("/login");
					}
					else if (resp.status === 401)
					{
						alert("Session expired. Please login again to continue...");
						localStorage.removeItem("token");
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
					console.log("error code: " + resp.status);
					// alert("handle this error")
					// navigate("/login");
				}
				setIsAuthDone(true);
			}))
		}

	}, []);

	return (
		<div>
			<Header />
			<Routes>
				{
					!authState.idToken &&
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Login />} />
					</>
				}

				<Route path="/" element={<Products />}>
					<Route path="category/:category" element={<Products />} />
				</Route>
				<Route path="/profile/info" element={<Profile isAuthDone={isAuthDone} />} />

				<Route path="/profile" element={<Navigate to="/profile/info" replace />} />
				<Route path="/profile/orders" element={<Orders isAuthDone={isAuthDone} />} />

				<Route path="/404" element={<Error404 />} />
				<Route
					path="*"
					element={<Navigate to="/" replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;