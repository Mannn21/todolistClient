import LoginForm from "../../components/LoginForm";
import { Container, FormWrapper, Image, ImageWrapper, Wrapper } from "./styled.js";

const Login = () => {
	return (
		<Container>
			<Wrapper>
				<FormWrapper>
					<LoginForm />
				</FormWrapper>
				<ImageWrapper>
					<Image src="/login.webp" alt="Login Image" />
				</ImageWrapper>
			</Wrapper>
		</Container>
	);
};

export default Login;
