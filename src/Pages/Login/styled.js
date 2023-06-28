import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
`;

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
    box-sizing: border-box;
`;

export const ImageWrapper = styled.section`
	height: 100%;
	width: 40%;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

export const FormWrapper = styled.section`
	height: 100%;
	width: 60%;
    display: flex;
    justify-content: center;
    border: none !important;
    outline: none !important;
`;
