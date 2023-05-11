import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBox = () =>
{
	const { search: location } = useLocation();
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSearchInput = (event) =>
	{
		// console.log("event.target.value:" + event.target.value)
		setSearch(event.target.value);
	}

	const handleSearch = (event) =>
	{
		event.preventDefault();
		navigate("?search=" + search);
	}

	useEffect(() =>
	{
		const searchQueryParams = new URLSearchParams(location).get("search");
		// console.log("searchQueryParams: " + searchQueryParams)
		setSearch(searchQueryParams || "");
	}, [location]);


	return (
		<>
			<form onSubmit={handleSearch}>
				<input name="search" type="text"
					id="search"
					placeholder="Enter product name or category"
					value={search}
					onChange={handleSearchInput}
				/>
				<button type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
						height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none"
						strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<circle cx="10" cy="10" r="7" />
						<line x1="21" y1="21" x2="15" y2="15" />
					</svg>
				</button>
			</form>
			<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
				height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
				strokeLinejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<circle cx="10" cy="10" r="7" />
				<line x1="21" y1="21" x2="15" y2="15" />
			</svg>
		</>
	);
}

export default SearchBox;