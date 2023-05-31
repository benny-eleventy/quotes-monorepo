import styled from "styled-components";

const StyledDiv = styled.div`
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	width: 100px;
	height: 100px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: black;
`;

const StyledButton = styled.button`
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	width: auto;
	height: auto;
	padding: 10px 15px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: black;
`;

const StyledInput = styled.input`
	padding: 10px 15px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;
	color: #fff;
	transition: border-color 0.2s;
	width: 80%;

	&:focus {
		border-color: #0080ff;
		outline: none;
	}
	&:placeholder {
		color: #fff;
		opacity: 1; /* Firefox */
	}
`;

export { StyledDiv, StyledButton, StyledInput };
