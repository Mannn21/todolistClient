import React, { useState, useRef } from "react";
import {
	Container,
	Wrapper,
	InputWrapper,
	ButtonWrapper,
	TextInput,
	DateInput,
	DropdownWrapper,
	Select,
	Option,
} from "./styled.js";
import styled from "./index.module.css";
import { Button } from "flowbite-react";
import { useToken } from "../../utils/TokenContext.jsx";

const Action = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("Work");
	const [date, setDate] = useState("");

	const { refreshHooks, axiosJWT, tokenData } = useToken();
	const { refresh, setRefresh } = refreshHooks;
	const { id, token } = tokenData;

	const titleRef = useRef(null);
	const categoryRef = useRef(null);
	const dateRef = useRef(null);

	const handleCategory = e => {
		setCategory(e);
	};

	const handleTitle = e => {
		setTitle(e);
	};

	const handleDate = e => {
		setDate(e);
	};
	const resetForm = () => {
		titleRef.current.value = "";
		categoryRef.current.value = "Work";
		dateRef.current.value = "";
	};

	const createActivity = async () => {
		const requestData = {
			userId: id,
			title,
			category,
			date: date + ":00.000Z",
		};
		await axiosJWT
			.post(`${import.meta.env.VITE_BASE_URL}/activity/`, requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setRefresh(!refresh);
			});
	};

	return (
		<Container>
			<Wrapper>
				<InputWrapper>
					<TextInput
						ref={titleRef}
						type="text"
						placeholder="Add new ..."
						className={styled.input}
						onChange={e => handleTitle(e.target.value)}
					/>
					<DropdownWrapper>
						<Select
							ref={categoryRef}
							name="category"
							id="category"
							onClick={e => handleCategory(e.target.value)}>
							<Option value="Work">Work</Option>
							<Option value="Study">Study</Option>
							<Option value="Rest">Rest</Option>
							<Option value="Other">Other</Option>
						</Select>
					</DropdownWrapper>
					<ButtonWrapper>
						<DateInput
							ref={dateRef}
							type='datetime-local'
							className={styled.input}
							onChange={e => handleDate(e.target.value)}
						/>
						<Button
							gradientDuoTone="purpleToBlue"
							onClick={() => {
								createActivity();
								resetForm();
							}}>
							Add
						</Button>
					</ButtonWrapper>
				</InputWrapper>
			</Wrapper>
		</Container>
	);
};

export default Action;
