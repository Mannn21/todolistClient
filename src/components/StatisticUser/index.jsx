import React, { useEffect, useState } from "react";
import { useToken } from "../../utils/TokenContext";
import { Container, Wrapper, StatsWrapper, ChartWrapper } from "./styled.js";
import {
	getDataSevenDaysAgo,
	getDataThisMonth,
	getDataLastSixMonths,
} from "../../utils/getDataByTime.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(CategoryScale, LinearScale, BarElement);

const StatisticUser = () => {
	const [groupedActivities, setGroupedActivities] = useState([]);
	const [groupedSevenDaysActivities, setGroupedSevenDaysActivities] = useState(
		[]
	);
	const [category, setCategory] = useState({});
	const [groupedOneMonthActivities, setGroupedOneMonthActivities] = useState(
		[]
	);
	const [groupedSixMonthActivities, setGroupedSixMonthActivities] = useState(
		[]
	);
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "Completed",
				data: [],
				backgroundColor: "#f3ba2f",
				borderColor: "black",
				borderWidth: 2,
			},
			{
				label: "Total Activity",
				data: [],
				backgroundColor: "#fe4365",
				borderColor: "black",
				borderWidth: 2,
			},
		],
	});

	const [doughnutData, setDoughnutData] = useState({
		labels: [],
		datasets: [
			{
				label: "Total",
				data: [],
				backgroundColor: ["Red", "Orange", "Yellow", "Green", "Blue"],
				borderColor: "black",
				borderWidth: 1.4,
			},
		],
	});

	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh } = refreshHooks;
	const { token } = tokenData;

	const fetchDataSevenDaysAgo = async () => {
		try {
			const data = await getDataSevenDaysAgo(groupedActivities, "date");
			setGroupedSevenDaysActivities(data);
		} catch (error) {
			console.error("Error fetching data seven days ago:", error);
		}
	};

	const fetchDataOneMonth = async () => {
		try {
			const data = await getDataThisMonth(groupedActivities, "date");
			setGroupedOneMonthActivities(data);
		} catch (error) {
			console.error("Error fetching data one month ago:", error);
		}
	};

	const fetchDataSixMonth = async () => {
		try {
			const data = await getDataLastSixMonths(groupedActivities, "date");
			setGroupedSixMonthActivities(data);
		} catch (error) {
			console.error("Error fetching data six months ago:", error);
		}
	};

	useEffect(() => {
		getAllActivities();
	}, [refresh]);

	useEffect(() => {
		if (groupedActivities.length > 0) {
			fetchDataSevenDaysAgo();
			fetchDataOneMonth();
			fetchDataSixMonth();
			handleCategory();
		}
	}, [groupedActivities]);

	useEffect(() => {
		if (groupedSevenDaysActivities.length > 0) {
			const completedData = groupedSevenDaysActivities.map(item => {
				const completedCount = item[1].filter(
					activity => activity.completed
				).length;
				return completedCount;
			});

			setChartData(prevData => ({
				...prevData,
				labels: groupedSevenDaysActivities.map(item => item[0]),
				datasets: [
					{
						...prevData.datasets[0],
						data: completedData,
					},
					{
						...prevData.datasets[1],
						data: groupedSevenDaysActivities.map(item => item[1].length),
					},
				],
			}));
		}
	}, [groupedSevenDaysActivities]);

	useEffect(() => {
		const doughnutData = {
			labels: Object.keys(category),
			datasets: [
				{
					label: "Total",
					data: Object.values(category),
					backgroundColor: ["#375e97", "#9bc01c", "#f0810f", "#f52549"],
				},
			],
		};
		setDoughnutData(doughnutData);
	}, [category]);

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
			setGroupedActivities(response.data.payload.details.data);
		} catch (error) {
			console.log(error);
		}
	};

	const mappedData = groupedSevenDaysActivities.map(item => {
		const filter = item[1].reduce((acc, item) => {
			const { category, ...rest } = item;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(rest);
			return acc;
		}, {});
		return filter;
	});

	const categoryCounts = mappedData.reduce((acc, item) => {
		Object.keys(item).forEach(category => {
			if (!acc[category]) {
				acc[category] = 0;
			}
			acc[category] += item[category].length;
		});
		return acc;
	}, {});

	const handleCategory = () => {
		setCategory(categoryCounts);
	};

	return (
		<Container>
			<Wrapper>
				<ChartWrapper>
					<Bar data={chartData} />
				</ChartWrapper>
				<StatsWrapper>
					<Doughnut data={doughnutData} />
				</StatsWrapper>
			</Wrapper>
		</Container>
	);
};

export default StatisticUser;
