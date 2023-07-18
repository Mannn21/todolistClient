import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	margin-top: 80px;
`;

export const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 30px;
`;

export const TimelineWrapper = styled.div`
	width: 96%;
	height: auto;
	display: flex;
	flex-direction: column;
	padding: 10px 30px;
	border-radius: 10px;
	background-color: #ededed;
	box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-webkit-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-moz-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
`;

export const TimelineHeader = styled.h2`
	font-family: "Poppins", sans-serif;
	font-size: 20px;
	font-weight: 700;
`;

export const TimelineBox = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
	margin-top: 10px;
`;

export const ActivityWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 45px;
	width: 100%;
	height: 95px;
	justify-content: flex-start;
	align-items: center;
    border-bottom: 1px solid rgba(220, 220, 220, .7);
`;

export const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 3px; */
    justify-content: space-around;
    height: 100%;
    width: auto;
`

export const Title = styled.h3`
    font-size: 18px;
    font-family: 'raleway', serif;
    font-weight: 600;
    letter-spacing: 1.05px;
`
