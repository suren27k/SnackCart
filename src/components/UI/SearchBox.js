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
					placeholder="Enter search query"
					value={search}
					onChange={handleSearchInput}
				/>
				<button type="submit">
					<i class="bi bi-search"></i>
				</button>
			</form>
			<div className="user-actions search">
				<button>
					<span>Search</span>
					<i class="bi bi-search"></i>
				</button>
			</div>

		</>
	);
}

export default SearchBox;