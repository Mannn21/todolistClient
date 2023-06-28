import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Label, TextInput } from "flowbite-react";
import { IconContext } from "react-icons";
import { AiOutlineCheck } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { formatDateTime } from "../../../utils/formatDateTime";
import styled from "./styled.module.css";
import { Option, DropdownWrapper, Select } from "./styled";
import { useToken } from "../../../utils/TokenContext";

const TableRow = () => {
	const [activity, setActivity] = useState([]);
	const [idDelete, setIdDelete] = useState(null);
	const [idUpdate, setIdUpdate] = useState(null);
	const [title, setTitle] = useState("");
	const [titleUpdate, setTitleUpdate] = useState("");
	const [categoryUpdate, setCategoryUpdate] = useState("");
	const [dateUpdate, setDateUpdate] = useState("");
	const [openModalDelete, setOpenModalDelete] = useState(undefined);
	const [openModalUpdate, setOpenModalUpdate] = useState(undefined);

	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh, setRefresh } = refreshHooks;
	const { id, token } = tokenData;

	useEffect(() => {
		getData();
	}, [refresh]);

	const getData = async () => {
		try {
			const response = await axiosJWT.get(
				`${import.meta.env.VITE_BASE_URL}/activity`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setActivity(response.data.payload.details.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteActivity = async (id, userId, category) => {
		await axiosJWT
			.delete(
				`${import.meta.env.VITE_BASE_URL}/activity/${userId}/${id}/${category}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				setOpenModalDelete(undefined);
				setRefresh(!refresh);
			});
	};

	const updateStatus = async (userId, completed, id, category) => {
		const requestData = {
			userId,
			completed,
			id,
			category,
		};
		await axiosJWT
			.put(`${import.meta.env.VITE_BASE_URL}/activity/status`, requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setRefresh(!refresh);
			});
	};

	const handleTitleUpdate = e => {
		setTitleUpdate(e);
	};

	const handleCategoryUpdate = e => {
		setCategoryUpdate(e);
	};

	const handleDateUpdate = e => {
		setDateUpdate(e + ":00.000Z");
	};

	const resetForm = () => {
		setTitleUpdate("");
		setCategoryUpdate("");
		setDateUpdate("");
	};

	const UpdateActivity = async () => {
		const requestData = {
			userId: id,
			title: titleUpdate,
			id: idUpdate,
			category: categoryUpdate,
			date: dateUpdate,
		};
		await axiosJWT
			.put(`${import.meta.env.VITE_BASE_URL}/activity`, requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setRefresh(!refresh);
				resetForm();
				setOpenModalUpdate(undefined);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<>
			{activity?.map((item, index) => (
				<Table.Row
					key={index}
					className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
						{item.title}
					</Table.Cell>
					<Table.Cell className="text-center">{item.category}</Table.Cell>
					<Table.Cell className="flex flex-row justify-center items-center text-center">
						{item.completed === 1 ? (
							<IconContext.Provider value={{ className: styled.check }}>
								<AiOutlineCheck />
							</IconContext.Provider>
						) : (
							<IconContext.Provider value={{ className: styled.timer }}>
								<GiSandsOfTime />
							</IconContext.Provider>
						)}
						<div>
							<span>{formatDateTime(item.date)}</span>
						</div>
					</Table.Cell>
					<Table.Cell className="text-center">
						{item.completed === 0 ? "Uncompled" : "Completed"}
					</Table.Cell>

					{/* Status Button */}
					<Table.Cell className="flex justify-center">
						{item.completed === 1 ? (
							<Button
								color="success"
								size="xs"
								style={{ width: "100px" }}
								onClick={() =>
									updateStatus(id, !item.completed, item.id, item.category)
								}>
								Completed
							</Button>
						) : (
							<Button
								color="failure"
								size="xs"
								style={{ width: "100px" }}
								onClick={() =>
									updateStatus(id, !item.completed, item.id, item.category)
								}>
								Uncompleted
							</Button>
						)}
					</Table.Cell>

					{/* Update Button */}
					<Table.Cell>
						<IconContext.Provider value={{ className: styled.edit }}>
							<MdOutlineModeEdit
								onClick={() => {
									setIdUpdate(item.id);
									setTitleUpdate(item.title);
									setCategoryUpdate(item.category);
									setDateUpdate(item.date);
									setOpenModalUpdate("form-elements");
								}}
							/>
						</IconContext.Provider>
						{openModalUpdate === undefined ? (
							<></>
						) : (
							<Modal
								show={openModalUpdate === "form-elements"}
								size="md"
								popup
								onClose={() => setOpenModalUpdate(undefined)}>
								<Modal.Header />
								<Modal.Body>
									<div className="space-y-6">
										<h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">
											Edit Aktivitas {titleUpdate}
										</h3>
										<div className="mb-4">
											<div className="mb-2 block">
												<Label htmlFor="updateTitle" value="Title" />
											</div>
											<TextInput
												type="text"
												id="updateTitle"
												placeholder="Input New Title"
												required
												onChange={e => handleTitleUpdate(e.target.value)}
											/>
										</div>
										<DropdownWrapper>
											<Label>Category</Label>
											<Select
												name="category"
												id="category"
												onClick={e => handleCategoryUpdate(e.target.value)}>
												<Option value="Work">Work</Option>
												<Option value="Study">Study</Option>
												<Option value="Rest">Rest</Option>
												<Option value="Other">Other</Option>
											</Select>
										</DropdownWrapper>
										<div className="mb-4">
											<div className="mb-2 block">
												<Label htmlFor="updateDatetime" value="Date and Time" />
											</div>
											<input
												id="updateDatetime"
												type="datetime-local"
												required
												onChange={e => handleDateUpdate(e.target.value)}
												defaultValue={dateUpdate}
											/>
										</div>
										<div className="w-full">
											<Button onClick={() => UpdateActivity()}>Update</Button>
										</div>
									</div>
								</Modal.Body>
							</Modal>
						)}
					</Table.Cell>

					{/* Delete Button */}
					<Table.Cell>
						<IconContext.Provider value={{ className: styled.delete }}>
							<RiDeleteBinFill
								onClick={() => {
									setIdDelete(item.id);
									setTitle(item.title);
									setOpenModalDelete("pop-up");
								}}
							/>
						</IconContext.Provider>
						<Modal
							show={openModalDelete === "pop-up"}
							size="md"
							popup
							onClose={() => setOpenModalDelete(undefined)}>
							<Modal.Header />
							<Modal.Body>
								<div className="text-center">
									<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Apakah kamu yakin ingin menghapus {title}?
									</h3>
									<div className="flex justify-center gap-4">
										<Button
											color="failure"
											onClick={() =>
												deleteActivity(idDelete, id, item.category)
											}>
											Yes, I'm sure
										</Button>
										<Button
											color="gray"
											onClick={() => setOpenModalDelete(undefined)}>
											No, cancel
										</Button>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</Table.Cell>
				</Table.Row>
			))}
		</>
	);
};

export default TableRow;
