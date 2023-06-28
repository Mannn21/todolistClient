import styled from 'styled-components'

export const ProfileWrapper = styled.section`
	height: 80%;
	width: 90%;
	box-shadow: 2px 2px 10px 1px rgba(31, 31, 31, 0.71);
	-webkit-box-shadow: 2px 2px 10px 1px rgba(31, 31, 31, 0.71);
	-moz-box-shadow: 2px 2px 10px 1px rgba(31, 31, 31, 0.71);
`;

export const ImageWrapper = styled.section`
	height: 50%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ImageMask = styled.div`
	border-radius: 50%;
	width: 200px;
	height: 200px;
	overflow: hidden;
	box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
	-webkit-box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
	-moz-box-shadow: 2px 2px 6px 2px rgba(31, 31, 31, 0.71);
`;

export const Image = styled.img`
	height: 130%;
	width: 130%;
	object-fit: cover;
`;

export const DataWrapper = styled.div`
	height: 50%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;