import styled from "styled-components";

export const Container = styled.div`
	height: 90px;
	width: 100%;
	box-sizing: border-box;
	margin-top: 60px;
`;

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const InputWrapper = styled.div`
	height: 98%;
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 40px;
	border-radius: 12px;
	box-shadow: 2px 2px 20px 0px rgba(83, 91, 97, 0.75);
	-webkit-box-shadow: 2px 2px 20px 0px rgba(83, 91, 97, 0.75);
	-moz-box-shadow: 2px 2px 20px 0px rgba(83, 91, 97, 0.75);
`;

export const TextInput = styled.input`
	outline: none !important;
	border: none !important;
	height: 60%;
	width: 60%;
	font-size: 18px;
	
	:focus, :active {
		outline: none !important;
		border: none !important;
	}
`;

export const DropdownWrapper = styled.div`
	height: 60%;
	display: flex;
	gap: 10px;
	align-items: center;
`;

export const Label = styled.label`
	font-size: 15px;
	letter-spacing: 1.1px;
	font-family: "Poppins", sans-serif;
`;

export const Select = styled.select`
	height: 100%;
	border: none;
	outline: none;
	font-size: 14px;
	font-family: "Poppins", sans-serif;
`;

export const Option = styled.option`
	font-size: 13px;
	font-family: "Poppins", sans-serif;
`;

export const ButtonWrapper = styled.div`
	width: 285px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

export const DateInput = styled.input`
	border: none;
	outline: none;
`;
