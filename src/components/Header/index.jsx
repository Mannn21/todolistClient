import React from "react";
import { Container, Wrapper, HeaderText, GreetName } from "./styled.js";
import { useToken } from "../../utils/TokenContext.jsx";

const Header = () => {
	const { tokenData } = useToken();
	const { name } = tokenData;
	
	return (
		<Container>
			<Wrapper>
				<HeaderText>My ToDo App</HeaderText>
				<GreetName>Welcome back {name}</GreetName>
			</Wrapper>
		</Container>
	);
};

export default Header;
