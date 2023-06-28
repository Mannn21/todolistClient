import React, { useState } from "react";
import {
	Container,
	Wrapper,
	ImageWrapper,
	TextWrapper,
	Image,
	HeaderText,
	Text,
	TextBack,
} from "./styled";

const NotFound = () => {
	return (
		<Container>
			<Wrapper>
				<ImageWrapper>
					<Image src="/error.svg" alt="" />
				</ImageWrapper>
				<TextWrapper>
					<HeaderText>Ooppssss ! 404 Not Found</HeaderText>
					<Text>Sepertinya anda menemukan halaman yang sudah lama hilang</Text>
					<TextBack to={"/dashboard"}>Temukan jalan pulang</TextBack>
				</TextWrapper>
			</Wrapper>
		</Container>
	);
};

export default NotFound;
