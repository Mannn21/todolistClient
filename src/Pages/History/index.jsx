import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import HistoryUser from "../../components/HistoryUser";
import { useToken } from "../../utils/TokenContext.jsx";

const History = () => {
	const { refreshHooks, tokenData } = useToken();
	const { refresh } = refreshHooks;
	const { token, getRefreshToken } = tokenData;

	useEffect(() => {
		getRefreshToken();
	}, [refresh]);

	return (
		<>
			{token === "" ? (
				<></>
			) : (
				<div>
					<Navbar />
					<HistoryUser />
				</div>
			)}
		</>
	);
};

export default History;
