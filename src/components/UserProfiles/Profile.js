import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserProfileData, sendDisplayNameChangeRequest, sendEmailVerificationRequest } from "../../action/profile";
import AccountDeletionMessage from "../UI/AccountDeletionMessage";
import Loader, { Overlay } from "../UI/Loader";
import Spinner from "../UI/Spinner";
import ProfileNavbar from "./ProfileNavbar";

const Profile = ({ isAuthDone }) =>
{
	const [loader, setLoader] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const dispatcher = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const [user, setUser] = useState([]);
	const [editNameTrigger, setEditNameTrigger] = useState(false);
	// console.log("token: " + token)

	const [newName, setNewName] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);
	const [showSpinner2, setShowSpinner2] = useState(false);
	const [showAccountDeletionMsg, setShowAccountDeletionMsg] = useState(false);

	useEffect(() =>
	{
		// console.log("inside useEffect of Profile js isAuthDone: " + isAuthDone)

		async function getUserData()
		{
			setLoader(true);
			// console.log("In Profile.js sending request to getUserProfileData ");
			await dispatcher(getUserProfileData(response =>
			{
				//callback function


				// console.log("response of getUserProfileData is below:")
				// console.log(response);

				try
				{
					if (!response.error)
					{
						setLoader(false);
						// console.log(response)
						let user = response.users[0];
						// console.log("in Profile.js and user data is below: ")
						// console.log(user)


						// let createdDate = getCurrentDate(new Date(parseInt(user.createdAt)));
						// console.log("createdDate: " + user.createdAt);
						// console.log("createdDate after dateutil: " + createdDate.time + "-->" + createdDate.day);

						let createdDate = new Date(parseInt(user.createdAt)).toString();

						let num = parseInt(user.lastLoginAt) + parseInt(user.validSince);
						let validSince = new Date(num).toString();

						let lastLoginAt = new Date(parseInt(user.lastLoginAt)).toString();
						let passwordUpdatedAt = new Date(parseInt(user.passwordUpdatedAt)).toString();

						let emailVerified = user.emailVerified.toString();

						// console.log("validSince: " + user.validSince + "-->" + validSince);
						setUser({
							...user,
							createdDate: createdDate,
							validSince: validSince,
							lastLoginAt: lastLoginAt,
							email: user.email,
							emailVerified: emailVerified,
							passwordUpdatedAt: passwordUpdatedAt,
							displayName: user.displayName
						});
						// console.log("orderIdArray: " + orderIdArray);

						// setNewName(user.displayName);

						setShowContent(true);
					}
					else
					{
						// console.log("Yes response error")
						alert(response.data.error || "Some generic msg incase key missing");
						setLoader(false);

						// console.log(response);

						if (response.error)
						{
							if (response.status === 400)
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
				}
				catch (error)
				{
					setLoader(false);

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

		if (isAuthDone)
		{
			getUserData();
		}

		// setTimeout(() =>
		// {
		// 	console.log("isAuthDone inside timeout: " + isAuthDone)
		// 	if (!isAuthDone)
		// 	{
		// 		alert("reloading via timeout")
		// 		window.location.reload(false);
		// 	}
		// }, 5000);

		//clean up function which runs when component is destroyed
		return () =>
		{
			setLoader(false);
			setUser([]);
		}

	}, [isAuthDone]);

	const editNameAction = () =>
	{
		setNewName(user.displayName);
		setEditNameTrigger(true);
	}

	const nameOnChangeAction = (e) =>
	{

		setNewName(e.target.value)
	}

	const cancelEditNameRequest = () =>
	{
		setEditNameTrigger(false);
	}

	async function sendEditNameRequest() 
	{
		let newDisplayName = newName;
		newDisplayName = newDisplayName.trim();

		setNewName(newDisplayName);

		if (newDisplayName.length > 25)
		{
			alert("Name should not exceed 25 characters");
			return;
		}

		setShowSpinner(true);

		// setTimeout(() =>
		// {
		// 	setShowSpinner(false);
		// }, 2000);


		await dispatcher(sendDisplayNameChangeRequest(newDisplayName, (response) =>
		{
			//callback function

			try
			{
				if (!response.error)
				{


					setUser({
						...user,
						displayName: response.data.displayName
					});

					alert("Name changed!")
				}
				else
				{
					// console.log("Yes response error")
					alert(response.data.error || "Some generic msg incase key missing");


					// console.log(response);

					if (response.error)
					{
						if (response.status === 400)
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
				setEditNameTrigger(false);
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

	async function requestEmailVerificationAction()
	{
		// console.log("inside requestEmailVerificationAction")

		setShowSpinner2(true);

		// setTimeout(() =>
		// {
		// 	setShowSpinner2(false);
		// }, 2000);

		// return;

		await dispatcher(sendEmailVerificationRequest(response =>
		{
			//callback function

			try
			{
				if (!response.error)
				{

					alert("Please check your email (spam folder) for verifcation link from Google Firebase!")
				}
				else
				{
					// console.log("Yes response error")
					alert(response.data.error || "Some generic msg incase key missing");


					// console.log(response);

					if (response.error)
					{
						if (response.status === 400)
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
				setShowSpinner2(false);
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

	const deleteAccountAction = () =>
	{
		// console.log("Inside delete account action")
		setShowAccountDeletionMsg(true);
	}

	const closeDeleteAccountActionModal = () =>
	{
		setShowAccountDeletionMsg(false);
	}

	return (
		<>
			<ProfileNavbar />

			{(() =>
			{

				if (token === null)
				{
					return (
						<Navigate to="/login" />
					)

				}
				else if (showContent)
				{
					return (
						<>
							<h1>Profile Information</h1>
							<section className="profile-section">
								<div className="profile-info-container">
									<div className="info-card">
										<div className="personal-info">
											<h2>Your Personal Information</h2>
											<div className="display-name">
												<span className="item-name">Display Name :</span>
												<span className="item-value">{user.displayName || "Not set yet"}</span>
												{
													!editNameTrigger ?
														(
															<>
																<span onClick={editNameAction} className="item-action">
																	<span className="divider">| </span>
																	<span className="action-name">Edit Name</span>
																	<span className="divider"> |</span>
																</span>
															</>
														)

														:
														(

															<span className="edit-item">
																<input
																	autoFocus
																	placeholder="Enter new name"
																	type="text"
																	name="name"
																	value={newName}
																	onChange={nameOnChangeAction}></input>
																{showSpinner ?
																	<>
																		<button className="confirm-button loading-btn">Saving..</button><Spinner />
																		<Overlay />
																	</>
																	:
																	<>
																		<button className="confirm-button" onClick={sendEditNameRequest} title="Save">
																			Save
																		</button>
																		<button className="cancel-button" onClick={cancelEditNameRequest} title="Cancel">
																			Cancel
																		</button>
																	</>
																}

															</span>

														)
												}


											</div>
											<div><span className="item-name">Email :</span> <span className="item-value">{user.email}</span></div>
											<div><span className="item-name">Email verified :</span> <span className="item-value">{user.emailVerified}</span>
												{
													user.emailVerified === "false" &&
													<>
														<span onClick={requestEmailVerificationAction} className="item-action">
															<span className="divider">| </span>
															<span className="action-name">Request Verification email</span>
															{showSpinner2 &&
																<>
																	<Spinner />
																	<Overlay />
																</>
															}
															<span className="divider"> |</span>
														</span>
														<span className="action-tip">(You can request verification if you are not using a dummy email)</span>
													</>
												}

											</div>
										</div>
										<hr></hr>
										<div className="account-info">
											<h2>Your Account Information</h2>
											<div><span className="item-name">Last login at : </span> <span className="item-value">{user.lastLoginAt}</span></div>

											<div><span className="item-name">Password updated at : </span> <span className="item-value">{user.passwordUpdatedAt}</span></div>
											<div><span className="item-name">Profile creation time : </span> <span className="item-value">{user.createdDate}</span></div>
											<div onClick={deleteAccountAction} className="delete-account">
												<span>Delete Account</span>
											</div>

										</div>
									</div>

								</div>
								{showAccountDeletionMsg && <AccountDeletionMessage onClose={closeDeleteAccountActionModal} />}
								{loader && <Loader />}
							</section >
						</>
					)

				}
			})()}


		</>

	);
}

export default Profile;