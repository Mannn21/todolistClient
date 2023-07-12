import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import EditProfile from "../../components/EditProfile";
import UserProfile from "../../components/UserProfile";
import { useToken } from "../../utils/TokenContext.jsx";
import {
	Container,
	Wrapper,
	ProfileContainer,
	EditContainer,
} from "./styled.js";

const Profile = () => {
	const { refreshHooks, tokenData } = useToken();
	const { refresh } = refreshHooks;
	const { token, getRefreshToken, name, email } = tokenData;

	useEffect(() => {
		getRefreshToken();
	}, [refresh]);

	return (
		<>
			{token === "" && email === "" && name === "" ? (
				<></>
			) : (
				<Container>
					<Navbar />
					<Wrapper>
						<ProfileContainer>
							<UserProfile />
						</ProfileContainer>
						<EditContainer>
							<EditProfile />
						</EditContainer>
					</Wrapper>
				</Container>
			)}
		</>
	);
};

export default Profile;
