import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAllOrdersOfUser } from "../../action/profile";
import Loader from "../UI/Loader";
import ProfileNavbar from "./ProfileNavbar";

const Orders = ({ isAuthDone }) =>
{
	const [loader, setLoader] = useState(false);
	const [items, setItems] = useState([]);
	const dispatcher = useDispatch();
	let navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem("token");

	useEffect(() =>
	{
		async function getOrdersRequest()
		{
			setLoader(true);
			await dispatcher(getAllOrdersOfUser(response =>
			{
				//callback function

				// console.log(response);

				if (!response.error)
				{
					setLoader(false);
					// console.log(response.data)
					const respData = response.data;
					const orderIdArray = Object.keys(respData)
					// console.log("orderIdArray: " + orderIdArray);

					let ordersMap = [];
					orderIdArray.forEach((id, index) =>
					{
						// console.log("id: " + id + " --> index: " + index);
						ordersMap[index] = {
							...respData[id],
							id: id
						}
					});

					// console.log("ordersMap: " + ordersMap)
					// console.log(ordersMap)

					// const data = respData.map((item) => item);
					setItems(ordersMap.reverse());
					// orders = response.data;
					// console.log("orders ---> ");
					// console.log(data);
				}
				else
				{
					// console.log("Yes response error")
					alert(response.data.error || "Some generic msg incase key missing");
					setLoader(false);

					console.log("inside callback in profile js --> location is: " + location.pathname);

					console.log(response);

					if (response.error && location.pathname === "/profile/orders")
					{
						if (response.status === 400)
						{
							alert("Please login to access this page.");
							localStorage.removeItem("token");
							navigate("/login");
						}
						else if (response.status === 401)
						{
							alert("Session expired. Please login again to continue...");
							localStorage.removeItem("token");
							navigate("/login");
						}
						else if (response.status === 404)
						{
							alert("Please login to access this page");
							navigate("/login");
						}

					}
				}

			}));
		}

		if (isAuthDone)
		{
			console.log("isauthdone is true finally!!")
			getOrdersRequest();
		}

		//clean up function which runs when component is destroyed
		return () =>
		{
			setItems([]);
			setLoader(false);
		}

	}, [isAuthDone]);

	return (
		<>
			{(() =>
			{

				if (token === null)
				{
					return (
						<Navigate to="/login" />
					)

				}
				else
				{
					return (
						<>
							<ProfileNavbar />
							<h1>Your Orders</h1>

							<section className="orders-section">

								<ul className="orders-list">

									{items.map((item, index) =>
									{

										return (
											<li className="order-item" key={item.id}>
												<div className="order-item-number">
													<div>{index + 1}</div>
												</div>
												<div className="order-item-info">
													<div className="order-item-info-text">
														<div className="order-body">

															<p>Order Id: {item.id}</p>
															<p>Ordered On: {item.orderedOn.day + " " + item.orderedOn.time}</p>
															<p>Items ordered: {item.items.length}</p>
														</div>
														<hr></hr>
														<div className="order-footer">

															<p>Total Amount: {item.totalAmount}</p>
														</div>
													</div>
													<div className="order-item-info-img">
														<div className="row">
															<div className="column">
																<img className="img-fluid" src={`/assets/${item.items[0].thumbnail}`} />
															</div>
															<div className="column">
																<img className="img-fluid" src={`/assets/${item.items[1].thumbnail}`} />
															</div>

														</div>
														{item.items.length > 2 &&
															<div className="order-item-info-quantity">
																<p>+{item.items.length - 2} more</p>
															</div>
														}
													</div>
												</div>
												<div className="order-item-link">
													<button>View</button>
												</div>
											</li>
										);
									})}

								</ul>
								{loader && <Loader />}
							</section>
						</>)
				}
			})()}
		</>
	);
}

export default Orders;