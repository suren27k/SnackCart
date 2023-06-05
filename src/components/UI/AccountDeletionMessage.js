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
		<Modal onClose={onClose}>
			<div className="account-deletion-container">
				<div className="message-container">
					<div className="danger-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" className="bi bi-exclamation-octagon" viewBox="0 0 16 16">
							<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
							<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
						</svg>
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