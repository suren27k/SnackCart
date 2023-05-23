import { NavLink } from "react-router-dom"

const Subheader = () =>
{
    return (
        <div className="subheader-container">
            <ul>
                <li><NavLink to="/">On Sale!!</NavLink></li>
                <li><NavLink to="category/fruits">Fruits</NavLink></li>
                <li><NavLink to="category/cookies">Cookies</NavLink></li>
                <li><NavLink to="category/crisps">Crisps</NavLink></li>
                <li><NavLink to="category/desserts">Desserts</NavLink></li>
                <li><NavLink to="category/beverages">Beverages</NavLink></li>
            </ul>
        </div>
    )
}

export default Subheader