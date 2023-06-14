import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Subheader from "../Layout/Subheader";
import Loader from "../UI/Loader";
import Modal from "../UI/Modal";
import ListItem from "./ListItems/ListItem";

const Products = () =>
{
	const [items, setItems] = useState([]);
	const [loader, setLoader] = useState(true);
	const [showContent, setShowContent] = useState(false);
	let params = useParams();
	let navigate = useNavigate();
	const search = useLocation();
	const searchQueryParams = new URLSearchParams(search).get("search");
	const tipShown = localStorage.getItem("tipShown");
	const [showModal, setShowModal] = useState(false);

	// console.log("Search:" + JSON.stringify(search));

	const handleBadRequest = () =>
	{
		// console.log("404 handled by product.js")
		navigate("/404");
	}

	useEffect(() =>
	{
		async function getData()
		{
			try
			{
				let slug = `items/sale.json`;

				// console.log("params:" + JSON.stringify(params));

				if (params.category)
				{
					slug = `items/${params.category}.json`;
				}

				if (searchQueryParams)
				{
					slug += `?search=${searchQueryParams}`;
				}
				// console.log("slug:" + slug);

				const url = `https://gfg-react-demo-default-rtdb.asia-southeast1.firebasedatabase.app/${slug}`;

				//send request
				const response = await axios.get(url);
				const respData = response.data;
				// console.log(response.data)

				if (!respData)
				{
					handleBadRequest();
					return;
				}

				const data = respData.map((item) => item);

				// console.log(JSON.stringify(data));
				setItems(data);
				setShowContent(true);
			} catch (error)
			{
				console.log(" main error" + error);
				// alert("some error occurred main");
			} finally
			{
				setLoader(false);
			}
		}

		getData();
		// console.log("tipShown: " + tipShown)

		//show tip
		if (tipShown === null || tipShown === false)
		{
			setTimeout(() =>
			{
				// console.log("showing tip");
				setShowModal(true);
			}, 1000);
		}



		//clean up function which runs when component is destroyed
		return () =>
		{
			setItems([]);
			setLoader(false);
		}
	}, [params.category, searchQueryParams]);

	const handleModalClick = () =>
	{
		setShowModal(previousState => !previousState);
		localStorage.setItem("tipShown", true);
	}

	return (
		<>
			{showContent &&
				<>
					<Subheader />
					<div className={"product-list"}>
						<div className={"product-list--wrapper"}>

							{items.map((item) =>
							{
								return <ListItem key={item.id} data={item} />;
							})}

						</div>
					</div>
				</>
			}

			{loader && <Loader />}
			{
				showModal &&
				<Modal customClass={"intro-tip"} onClose={handleModalClick}>
					<div>
						<h2>Welcome to my Project!</h2>
						<div className="tip">
							<h3>Hello! This is Surendar here.</h3>
							<p> Here is a brief list of features in this project
								{/* <br></br> */}
								{/* <small>(Psst! App is not yet fully responsive so please view via a desktop browser.)</small> */}
							</p>
							<h4> The following features are powered by Firebase.</h4>
							<ul>
								<li>You can use a dummy email to signup and place orders.</li>
								<li>Once you log in, the profile tab will be displayed next to the cart button at the top-right corner.</li>
								<li>Once an order is placed, you check out the order details in your profile.</li>
								<li>You can change your name, request email verification and also delete your account permanently from your profile.</li>
								<li>You can log out and log in anytime using the same credentials. So remember them.</li>
							</ul>

							<p>Please check out the readme file at github <a target="_blank" rel="noreferrer" href="https://github.com/suren27k/snackcart/blob/main/README.md">here</a>.</p>
						</div>
					</div>
				</Modal>
			}
		</>
	);
};

export default Products;
