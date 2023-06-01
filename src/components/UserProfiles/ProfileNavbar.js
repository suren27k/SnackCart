import { NavLink } from "react-router-dom";

const ProfileNavbar = () =>
{
	return (
		<div className="subheader-container">
			<ul>
				<li><NavLink to="/profile/info">Profile</NavLink></li>
				<li><NavLink to="/profile/orders">Orders</NavLink></li>
			</ul>
		</div>
	)
};

export default ProfileNavbar;