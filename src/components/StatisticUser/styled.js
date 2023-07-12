import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: calc(100% - 160px);
`;

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	gap: 15px;
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
`;

export const ChartWrapper = styled.div`
	width: 60%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-webkit-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-moz-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
`;

export const StatsWrapper = styled.div`
	width: 40%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-webkit-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	-moz-box-shadow: 3px 3px 10px 0px rgba(120, 120, 120, 0.75);
	border-radius: 10px;
`;
