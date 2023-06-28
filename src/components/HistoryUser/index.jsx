import React, { useState, useEffect } from "react";
import { useToken } from "../../utils/TokenContext";
import { formatDateTime } from "../../utils/formatDateTime";
import {
	Container,
	Wrapper,
	TimelineWrapper,
	TimelineHeader,
	TimelineBox,
	ActivityWrapper,
	DescriptionWrapper,
	Title,
} from "./styled.js";
import { IconContext } from "react-icons";
import { MdOutlineSchool } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import styled from "./styled.module.css";

const HistoryUser = () => {
	const [groupedActivities, setGroupedActivities] = useState([]);

	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh } = refreshHooks;
	const { token } = tokenData;

	useEffect(() => {
		getAllActivities();
	}, [refresh]);

	const getAllActivities = async () => {
		try {
			const response = await axiosJWT.get(
				`${import.meta.env.VITE_BASE_URL}/activity/all`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const grouped = groupActivitiesByDate(response.data.payload.details.data);
			const sortedActivities = Object.entries(grouped).sort(
				(a, b) => new Date(b[0]) - new Date(a[0])
			);
			setGroupedActivities(sortedActivities);
		} catch (error) {
			console.log(error);
		}
	};

	const formatDate = date => {
		const options = { day: "numeric", month: "long", year: "numeric" };
		return date.toLocaleDateString("id-ID", options);
	};

	const groupActivitiesByDate = activities => {
		const grouped = {};

		activities?.forEach(activity => {
			const date = new Date(activity.date);
			const formattedDate = date.toISOString().slice(0, 10);

			if (grouped[formattedDate]) {
				grouped[formattedDate].push(activity);
			} else {
				grouped[formattedDate] = [activity];
			}
		});
		return grouped;
	};

	return (
		<Container>
			<Wrapper>
				{groupedActivities.map(([date, activities]) => (
					<TimelineWrapper key={date}>
						<TimelineHeader>{formatDate(new Date(date))}</TimelineHeader>
						<TimelineBox>
							{activities.map((activity, index) => (
								<ActivityWrapper
									className="text-gray-600 dark:text-gray-400"
									key={index}>
									<div>
										{activity.category === "Work" ? (
											<IconContext.Provider
												value={{
													style: {
														backgroundColor: activity.color,
														color: "white",
														padding: "5px",
														borderRadius: "50%",
													},
												}}>
												<FaLaptopCode size={50} />
											</IconContext.Provider>
										) : activity.category === "Study" ? (
											<IconContext.Provider
												value={{
													style: {
														backgroundColor: activity.color,
														color: "white",
														padding: "5px",
														borderRadius: "50%",
													},
												}}>
												<MdOutlineSchool size={50} />
											</IconContext.Provider>
										) : activity.category === "Rest" ? (
											<IconContext.Provider
												value={{
													style: {
														backgroundColor: activity.color,
														color: "white",
														padding: "5px",
														borderRadius: "50%",
													},
												}}>
												<BiBed size={50} />
											</IconContext.Provider>
										) : (
											<IconContext.Provider
												value={{
													style: {
														backgroundColor: activity.color,
														color: "white",
														padding: "5px",
														borderRadius: "50%",
													},
												}}>
												<GiIsland size={50} />
											</IconContext.Provider>
										)}
										<span>{activity.category}</span>
									</div>
									<DescriptionWrapper>
										<div className="text-base font-normal">
											<Title className="font-medium text-gray-900 dark:text-white">
												{activity.title}
											</Title>
										</div>
										<div className="text-sm font-normal">
											{formatDateTime(activity.date)}
										</div>
										<span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
											{activity.completed === true ||
											activity.completed === 1 ? (
												<IconContext.Provider
													value={{ className: styled.check }}>
													<AiOutlineCheck />
												</IconContext.Provider>
											) : (
												<IconContext.Provider
													value={{ className: styled.timer }}>
													<AiOutlineCloseCircle />
												</IconContext.Provider>
											)}
											{activity.completed === false || activity.completed === 0
												? "Uncompled"
												: "Completed"}
										</span>
									</DescriptionWrapper>
								</ActivityWrapper>
							))}
						</TimelineBox>
					</TimelineWrapper>
				))}
			</Wrapper>
		</Container>
	);
};

export default HistoryUser;
