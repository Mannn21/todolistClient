import RegisterForm from "../../components/RegisterForm";
import { Container, FormWrapper, Image, ImageWrapper, Wrapper } from "./styled.js";

const Register = () => {
	return (
		<Container>
			<Wrapper>
				<ImageWrapper>
					<Image src="/reg.webp" alt="Register Image" />
				</ImageWrapper>
				<FormWrapper>
					<RegisterForm />
				</FormWrapper>
			</Wrapper>
		</Container>
	);
};

export default Register;
