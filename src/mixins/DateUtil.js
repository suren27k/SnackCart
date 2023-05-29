export const getCurrentDate = (date) =>
{
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const day = ('0' + date.getDate()).slice(-2) + " " + (months[date.getMonth()]) + ", " + date.getFullYear();
	const time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);


	return {

		time: time,
		day: day
	};
};

