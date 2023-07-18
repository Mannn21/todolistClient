import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Action from "../../components/Action";
import TableActivities from "../../components/TableActivities";
import { useToken } from "../../utils/TokenContext.jsx";
import {Container, Wrapper} from "./styled.js"

const Home = () => {
	const { tokenData } = useToken();
	const { token, getRefreshToken } = tokenData;

	useEffect(() => {
		const fetchData = async () => {
			await getRefreshToken();
		};

		fetchData();
	}, [getRefreshToken]);

	return (
		<>
			{!token ? (
				<></>
			) : (
				<Container>
					<Navbar />
					<Wrapper>
						<Header />
						<Action />
						<TableActivities />
					</Wrapper>
				</Container>
			)}
		</>
	);
};

export default Home;
