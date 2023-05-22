const authReducer = (state = {}, action) =>
{
	const { type, payload } = action

	switch (type)
	{
		case "SIGNUP": {
			return payload;
		}
		case "LOGIN": {
			return payload;
		}
		case "LOGOUT": {
			return {};
		}
		default: return state;
	}

}

export default authReducer;