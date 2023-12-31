import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
	width: 100%;
	box-sizing: border-box;
`;

export const Wrapper = styled.div`
	height: calc(100% - 95px);
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 80px;
`;

// ===================== LEFT STYLE ====================

export const ProfileContainer = styled.section`
	height: 100%;
	width: 30%;
	padding: 15px 30px;
`;

export const EditContainer = styled.section`
	height: 100%;
	width: 70%;
	padding: 15px 20px;
`;
// ==================== END RIGHT STYLE =====================
