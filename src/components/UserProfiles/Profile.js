import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllOrdersOfUser } from "../../action";
import Loader from "../UI/Loader";

const Profile = () =>
{
	const [loader, setLoader] = useState(false);
	const [items, setItems] = useState([]);
	const dispatcher = useDispatch();
	let navigate = useNavigate();
	let orders = [];




	useEffect(() =>
	{
		async function getOrdersRequest()
		{
			setLoader(true);
			await dispatcher(getAllOrdersOfUser(response =>
			{
				//callback function

				console.log(response);

				if (!response.error)
				{
					setLoader(false);
					setItems(response.data);
					orders = response.data;
					console.log(orders);
				}
				else
				{
					// console.log("Yes response error")
					alert(response.data.error || "Some generic msg incase key missing");
					setLoader(false);
				}

			}));
		}

		getOrdersRequest();
	}, []);

	return (
		<>
			<main>
				<NavLink to="/">Go Back</NavLink>
				<div>
					<h3>Your Orders</h3>
				</div>
				<div className={"orders-list"}>
					<div className={"product-list--wrapper"}>
						{/* {items.map((item) =>
						{
							console.log(item)
						})} */}
					</div>
				</div>
				{loader && <Loader />}
			</main>
		</>
	);
}

export default Profile;