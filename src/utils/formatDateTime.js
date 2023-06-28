import moment from "moment";

export const formatDateTime = dateTimeString => {
	const timestamp = dateTimeString;
	const formattedDate = moment
		.utc(timestamp)
		.format(`DD MMMM YYYY [pukul] HH:mm:ss`);
	return formattedDate;
};