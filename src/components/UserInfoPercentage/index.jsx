import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaTasks, FaPercentage } from "react-icons/fa";
import { MdCategory, MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useToken } from "../../utils/TokenContext.jsx";
import {
	Container,
	Wrapper,
	InfoWrapper,
	Info,
	InfoTextWrapper,
	InfoText,
	InfoHeader,
	IconWrapper,
	Icon,
	PercentageWrapper,
	PercentageContainer,
} from "./styled.js";
import styled from "./styled.module.css";

const UserInfoPercentage = () => {
	const [status, setStatus] = useState({ completed: null, unCompleted: null });
	const [mostCategory, setMostCategory] = useState({
		title: "",
		totalData: null,
	});
	const [createdDate, setCreatedDate] = useState("");
	const [activities, setActivities] = useState([]);
	const [totalActivities, setTotalActivities] = useState(null);
	const [longTimeUser, setLongTimeUser] = useState(null);
	const { tokenData, axiosJWT, refreshHooks } = useToken();
	const { refresh } = refreshHooks;
	const { email, getRefreshToken, token } = tokenData;

	useEffect(() => {
		getUser();
		getRefreshToken();
		getAllActivities();
	}, [refresh]);

	useEffect(() => {
		handleState();
	}, [activities, createdDate]);

	const getUser = async () => {
		try {
			const response = await axiosJWT.post(
				`${import.meta.env.VITE_BASE_URL}/find`,
				{ email },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setCreatedDate(response.data.payload.details.data.create);
		} catch (error) {
			console.log(error);
		}
	};

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
			setActivities(response.data.payload.details.data);
			getCategory(response.data.payload.details.data);
			getStatusCounts(response.data.payload.details.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleState = () => {
		if (activities.length > 0 && createdDate) {
			const userCreated = new Date(createdDate);
			const now = new Date();
			const timeUserCreated = new Date(
				userCreated.getFullYear(),
				userCreated.getMonth(),
				userCreated.getDate()
			);
			const timeNow = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			);

			setLongTimeUser(
				Math.floor((timeNow - timeUserCreated) / (1000 * 60 * 60 * 24))
			);
			setTotalActivities(activities.length);
		}
	};

	const getCategory = async data => {
		const categoryCounts = await data.reduce((counts, activity) => {
			const { category } = activity;
			counts[category] = (counts[category] || 0) + 1;
			return counts;
		}, {});

		const sortDate = Object.values(categoryCounts).sort((a, b) => b - a);

		const maxCategory = Object.keys(categoryCounts).reduce((max, category) => {
			if (categoryCounts[category] > categoryCounts[max]) {
				return category;
			} else {
				return max;
			}
		});
		setMostCategory({ title: maxCategory, totalData: sortDate[0] });
	};

	const getStatusCounts = async data => {
		const statusCounts = await data.reduce(
			(counts, activity) => {
				const { completed } = activity;
				counts[completed] = (counts[completed] || 0) + 1;
				return counts;
			},
			{ true: 0, false: 0 }
		);

		const trueCount = statusCounts[true] || 0;

		const completedPercentage = Math.round((trueCount / data.length) * 100);
		const unCompletedPercentage = 100 - completedPercentage;

		setStatus({
			completed: completedPercentage,
			unCompleted: unCompletedPercentage,
		});
	};

	const formatDate = date => {
		const userCreated = new Date(date);
		const getDate = userCreated.getDate();
		const getMonth = userCreated.toLocaleString("default", { month: "long" });
		const getYear = userCreated.getFullYear();
		const timeUserCreated = `${getDate} ${getMonth} ${getYear}`;
		return timeUserCreated;
	};

	return (
		<Container>
			<Wrapper>
				<InfoWrapper>
					<Info>
						<InfoHeader>Lama Pengguna</InfoHeader>
						<InfoTextWrapper>
							<InfoText>{longTimeUser} Hari</InfoText>
							<InfoText fontSize={"14px"} fontWeight={500}>
								Sejak {formatDate(createdDate)}
							</InfoText>
						</InfoTextWrapper>
					</Info>
					<IconWrapper>
						<Icon color={"orangered"}>
							<IconContext.Provider
								value={{
									style: {
										color: "white",
										padding: "6px",
									},
								}}>
								<MdOutlineCalendarMonth size={36} />
							</IconContext.Provider>
						</Icon>
					</IconWrapper>
				</InfoWrapper>
				<InfoWrapper>
					<Info>
						<InfoHeader>Total Aktivitas</InfoHeader>
						<InfoTextWrapper>
							<InfoText>{totalActivities} Aktivitas</InfoText>
							<InfoText fontSize={"14px"} fontWeight={500}>
								{Math.ceil(totalActivities / longTimeUser)} aktivitas / hari
							</InfoText>
						</InfoTextWrapper>
					</Info>
					<IconWrapper>
						<Icon color={"purple"}>
							<IconContext.Provider
								value={{
									style: {
										color: "white",
										padding: "6px",
									},
								}}>
								<FaTasks size={36} />
							</IconContext.Provider>
						</Icon>
					</IconWrapper>
				</InfoWrapper>
				<InfoWrapper>
					<Info>
						<InfoHeader>Kategori Terbanyak</InfoHeader>
						<InfoTextWrapper>
							<InfoText>{mostCategory.title}</InfoText>
							<InfoText fontSize={"14px"} fontWeight={500}>
								{mostCategory.totalData} aktivitas
							</InfoText>
						</InfoTextWrapper>
					</Info>
					<IconWrapper>
						<Icon color={"green"}>
							<IconContext.Provider
								value={{
									style: {
										color: "white",
										padding: "6px",
									},
								}}>
								<MdCategory size={36} />
							</IconContext.Provider>
						</Icon>
					</IconWrapper>
				</InfoWrapper>
				<InfoWrapper>
					<Info>
						<InfoHeader>Persentase Status</InfoHeader>
						<PercentageContainer>
							<PercentageWrapper>
								<IconContext.Provider value={{ className: styled.check }}>
									<AiOutlineCheck />
								</IconContext.Provider>
								<InfoText color={"#333"}>{status.completed} %</InfoText>
							</PercentageWrapper>
							<PercentageWrapper>
								<IconContext.Provider value={{ className: styled.timer }}>
									<AiOutlineCloseCircle />
								</IconContext.Provider>
								<InfoText color={"#333"}>{status.unCompleted} %</InfoText>
							</PercentageWrapper>
						</PercentageContainer>
					</Info>
					<IconWrapper>
						<Icon color={"blue"}>
							<IconContext.Provider
								value={{
									style: {
										color: "white",
										padding: "6px",
									},
								}}>
								<FaPercentage size={36} />
							</IconContext.Provider>
						</Icon>
					</IconWrapper>
				</InfoWrapper>
			</Wrapper>
		</Container>
	);
};

export default UserInfoPercentage;
