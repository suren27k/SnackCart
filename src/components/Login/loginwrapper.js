import { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Login from "./";


const LoginWrapper = () =>
{
	const params = useParams();
	const navigate = useNavigate();

	const validPaths = ["login", "signup"];

	console.log("path: " + params.login_path)
	useEffect(() =>
	{
		console.log("inside WRAPPER")
		if (validPaths.includes(params.login_path))
		{
			console.log("valid path");
			// navigate("/" + params.login_path);
		}
		else
		{
			console.log("Invalid Path");
			navigate("/404");
		}
	}, [params.login_path])

	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Login />} />
			</Routes>
		</div>
	);
}

export default LoginWrapper;