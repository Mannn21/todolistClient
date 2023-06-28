import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
	height: 100vh;
	width: 100%;
	box-sizing: border-box;
`;

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const ImageWrapper = styled.section`
	height: 40%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Image = styled.img`
	height: 230px;
	width: 230px;
	object-fit: contain;
`;

export const TextWrapper = styled.section`
	height: 60%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const HeaderText = styled.h1`
	font-family: "Archivo Narrow", sans-serif;
	font-size: 60px;
	font-weight: 700;
`;

export const Text = styled.span`
	font-family: "Archivo Narrow", sans-serif;
	font-size: 25px;
	font-weight: 400;
`;

export const TextBack = styled(Link)`
	font-family: "Archivo Narrow", sans-serif;
	font-size: 20px;
	font-weight: 700;
	background-color: #5861E8 !important;
	color: white;
	padding: 5px 10px;
	margin-top: 20px;
	border-radius: 10px;
	cursor: pointer;
`;
