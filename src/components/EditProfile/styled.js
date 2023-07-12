import styled from 'styled-components'

export const EditWrapper = styled.section`
	height: 80%;
	width: 100%;
	padding: 2px 10px;
	/* border: 1px solid blue; */
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
	-webkit-box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
	-moz-box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
`;

export const EditHeaderWrapper = styled.div`
	height: 38px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const EditHeader = styled.h2`
	font-weight: 700;
	font-size: 20px;
`

export const EditModeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
	/* border: 1px solid red; */
`;

export const FormWrapper = styled.div`
	height: 300px;
	width: 100%;
	/* border: 1px solid blue; */
`

export const ModeWrapper = styled.div`
	width: 170px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: 4px;
`

export const EditMode = styled.span`
	font-family: "Raleway", sans-serif;
	font-size: 16px;
	font-weight: 600;
`;

export const Mode = styled.span`
	cursor: pointer;
	color: blue;
`;