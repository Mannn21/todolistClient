import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 160px;
`;

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding: 10px 20px;
	gap: 15px;
`;

export const InfoWrapper = styled.div`
	width: 270px;
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
    border-radius: 10px;
	padding: 3px 5px;
	box-shadow: 2px 2px 8px 0px rgba(128, 128, 128, 0.75);
	-webkit-box-shadow: 2px 2px 8px 0px rgba(128, 128, 128, 0.75);
	-moz-box-shadow: 2px 2px 8px 0px rgba(128, 128, 128, 0.75);
`;

export const Info = styled.div`
	height: 100%;
	width: calc(100% - 65px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`;

export const InfoHeader = styled.h3`
	font-size: 18px;
	font-family: "raleway", serif;
	letter-spacing: 1.05px;
	font-weight: 700;
	color: #222;
`;

export const InfoTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`

export const InfoText = styled.span`
	font-size: ${props => props.fontSize ? props.fontSize : "16px"};
	font-family: 'Poppins', sans-serif;
	letter-spacing: 1.05px;
	font-weight: ${props => props.fontWeight ? props.fontWeight : 600};
	color: #444;
`

export const PercentageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const PercentageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
	justify-content: flex-start;
`

export const IconWrapper = styled.div`
	height: 100%;
	width: 55px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Icon = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: ${props => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
`;
