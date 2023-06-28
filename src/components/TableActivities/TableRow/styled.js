import styled from 'styled-components'

export const DropdownWrapper = styled.div`
    width: 100%;
	height: 60%;
	display: flex;
    flex-direction: column;
	gap: 2px;
    justify-content: space-between;
	align-items: flex-start;
    margin-bottom: 12px;
`;

export const Label = styled.label`
	font-size: 15px;
	letter-spacing: 1.1px;
	font-family: "Poppins", sans-serif;
`;

export const Select = styled.select`
	height: 100%;
    width: 90%;
	font-size: 14px;
	font-family: "Poppins", sans-serif;
`;

export const Option = styled.option`
	font-size: 13px;
	font-family: "Poppins", sans-serif;
`;