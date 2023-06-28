import React, { useEffect } from "react";
import StatisticUser from "../../components/StatisticUser";
import Navbar from "../../components/Navbar";
import UserInfoPercentage from "../../components/UserInfoPercentage";
import { useToken } from "../../utils/TokenContext.jsx";
import {Container, Wrapper} from './styled.js'

const Statistic = () => {
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
				<Container>
					<Navbar />
					<Wrapper>
						<UserInfoPercentage />
						<StatisticUser />
					</Wrapper>
				</Container>
			)}
		</>
	);
};

export default Statistic;
