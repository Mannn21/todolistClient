import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: calc(100% - 160px);
	/* border: 1px solid green; */
`;

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	gap: 15px;
	padding: 10px 20px;
	/* border: 1px solid blue; */
	display: flex;
	flex-direction: row;
`;

export const ChartWrapper = styled.div`
	width: 60%;
	height: 100%;
	border: 1px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StatsWrapper = styled.div`
	width: 40%;
	height: 100%;
	border: 1px solid red;
	display: flex;
	justify-content: center;
	align-items: center;
`;
