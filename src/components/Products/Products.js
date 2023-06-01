import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Subheader from "../Layout/Subheader";
import Loader from "../UI/Loader";
import ListItem from "./ListItems/ListItem";

const Products = () =>
{
	const [items, setItems] = useState([]);
	const [loader, setLoader] = useState(true);
	let params = useParams();
	let navigate = useNavigate();
	const search = useLocation();
	const searchQueryParams = new URLSearchParams(search).get("search");

	// console.log("Search:" + JSON.stringify(search));

	const handleBadRequest = () =>
	{
		console.log("404 handled by product.js")
		navigate("/404");
	}

	useEffect(() =>
	{
		async function getData()
		{
			try
			{
				let slug = `test/sale.json`;

				// console.log("params:" + JSON.stringify(params));

				if (params.category)
				{
					slug = `test/${params.category}.json`;
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

		//clean up function which runs when component is destroyed
		return () =>
		{
			setItems([]);
			setLoader(false);
		}
	}, [params.category, searchQueryParams]);

	return (
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
			{loader && <Loader />}
		</>
	);
};

export default Products;
