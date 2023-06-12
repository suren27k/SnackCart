import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { expireSession } from "../../action/auth";
import { sendAccountDeletionRequest } from "../../action/profile";
import Spinner from "../UI/Spinner";
import Modal from "./Modal";

const AccountDeletionMessage = ({ onClose }) =>
{
	const [showSpinner, setShowSpinner] = useState(false);
	const dispatcher = useDispatch();
	const navigate = useNavigate();

	async function confirmDeleteAccountAction()
	{
		// console.log("sending delete acc request")

		setShowSpinner(true);

		// setTimeout(() =>
		// {
		// 	setShowSpinner(false);
		// }, 2000);

		// return;

		await dispatcher(sendAccountDeletionRequest(response =>
		{
			//callback function

			try
			{
				if (!response.error)
				{

					dispatcher(expireSession());
					alert("Your account has been deleted permanently!");
					navigate("/");
				}
				else
				{
					// console.log("Yes response error")
					// alert(response.data.error || "Some generic msg incase key missing");


					// console.log(response);

					if (response.error)
					{
						if (response.status === 400 && response.code === "ERR_BAD_REQUEST")
						{
							alert("Error in Request! ERR_BAD_REQUEST. Please try again later.");
							// localStorage.removeItem("token");
							// navigate("/login");
						}
						else if (response.status === 400)
						{
							alert("Session expired. Please login again to continue...");
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

				//revert ui changes
				setShowSpinner(false);
			}
			catch (error)
			{

				// console.log(error)

				if (response.error)
				{
					if (response.status === 400)
					{
						alert("Session expired. Please login again to continue...");
						localStorage.removeItem("token");
						navigate("/login");
					}
				}
			}
		}));


	}


	return (
		<Modal customClass={"delete-account__modal"} onClose={onClose}>
			<div className="account-deletion-container">
				<div className="message-container">
					<div className="danger-icon">
						<i className="bi bi-exclamation-octagon"></i>
					</div>
					<div className="message">
						<h2>Are you sure you want to delete your account?</h2>
						<span>(This is not a reversible action!)</span>
						<span>All your account info including order details will be deleted permanently!</span>

					</div>

				</div>
				<div className="action-buttons">
					<button onClick={onClose} type="cancel">Cancel</button>
					<button onClick={confirmDeleteAccountAction} type="submit">Delete Account</button>
					{showSpinner &&
						<>
							<Spinner />
						</>
					}
				</div>
			</div>
		</Modal>
	);
}

export default AccountDeletionMessage;