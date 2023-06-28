import styled from "styled-components";

export const Container = styled.div`
	height: calc(100vh - 80px);
	width: 100%;
	box-sizing: border-box;
`;

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
`;

// ===================== LEFT STYLE ====================

export const ProfileContainer = styled.section`
	height: 100%;
	width: 30%;
	padding: 15px 30px;
`;

export const StatisticWrapper = styled.section`
	height: 100%;
	width: 70%;
	padding: 5px 20px;
`;

export const ChartWrapper = styled.section`
	height: 55%;
	width: 100%;
`;

// ==================== END RIGHT STYLE =====================
