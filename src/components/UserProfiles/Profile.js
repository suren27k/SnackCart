import { useState } from "react";
import Loader from "../UI/Loader";
const Profile = () =>
{
	const [loader, setLoader] = useState(false);

	return (
		<>
			<div className={"product-list"}>
				<div className={"product-list--wrapper"}>
					{/* {items.map((item) =>
					{
						return <ListItem key={item.id} data={item} />;
					})} */}
					order list 1
					order list 2
					<br>
					</br>
					Under construction...
				</div>
			</div>
			{loader && <Loader />}
		</>
	);
}

export default Profile;