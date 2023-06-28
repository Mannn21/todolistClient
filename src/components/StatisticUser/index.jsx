import React, { useEffect, useState } from "react";
import { useToken } from "../../utils/TokenContext";
import { Container, Wrapper, StatsWrapper, ChartWrapper } from "./styled.js";

const StatisticUser = () => {
	const [groupedActivities, setGroupedActivities] = useState([]);
	const [groupedSevenDaysActivities, setGroupedSevenDaysActivities] = useState([]);
	const [groupedOneMonthActivities, setGroupedOneMonthActivities] = useState([]);
	const [groupedSixMonthActivities, setGroupedSixMonthActivities] = useState([]);
	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh } = refreshHooks;
	const { token } = tokenData;

	useEffect(() => {
		getAllActivities();
	}, [refresh]);

	useEffect(() => {
		if (groupedActivities.length > 0) {
			getDataSevenDaysAgo(groupedActivities, "date");
      getDataThisMonth(groupedActivities, "date")
      getDataLastSixMonths(groupedActivities, "date")
		}
	}, [groupedActivities]);

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

	const getDataSevenDaysAgo = async (obj, prop) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  
    const timeToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const timeEnd = new Date(
      sevenDaysAgo.getFullYear(),
      sevenDaysAgo.getMonth(),
      sevenDaysAgo.getDate()
    );
  
    const now = timeToday / (1000 * 60 * 60 * 24);
    const end = timeEnd / (1000 * 60 * 60 * 24);
  
    const filteredObj = obj?.filter(item => {
      const itemDate = new Date(item[prop]);
      const itemTimeDate = new Date(
        itemDate.getFullYear(),
        itemDate.getMonth(),
        itemDate.getDate()
      );
      const currentDate = itemTimeDate / (1000 * 60 * 60 * 24);
      return currentDate >= end && currentDate <= now;
    });
  
    const groupedData = filteredObj?.reduce((acc, item) => {
      const itemDate = new Date(item[prop]);
      const key = itemDate.toISOString().split('T')[0];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  
    const sortedData = Object.entries(groupedData).sort((a, b) => {
      return new Date(a[0]) - new Date(b[0]);
    });
  
    setGroupedSevenDaysActivities(sortedData.map(([date, activities]) => [date, activities]));
  };

  const getDataThisMonth = async (obj, prop) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const filteredObj = obj?.filter(item => {
      const itemDate = new Date(item[prop]);
      return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });
  
    const groupedData = filteredObj?.reduce((acc, item) => {
      const itemDate = new Date(item[prop]);
      const weekNumber = Math.ceil((itemDate.getDate() - startOfMonth.getDate() + startOfMonth.getDay()) / 7);
      const key = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}-Week${weekNumber}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  
    const sortedData = Object.entries(groupedData).sort((a, b) => {
      return new Date(a[0].split('-')[0], a[0].split('-')[1] - 1, parseInt(a[0].split('-')[2].substring(4))) - new Date(b[0].split('-')[0], b[0].split('-')[1] - 1, parseInt(b[0].split('-')[2].substring(4)));
    });
  
    setGroupedOneMonthActivities(sortedData.map(([date, activities]) => [date, activities]));
  };

  const getDataLastSixMonths = async (obj, prop) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
  
    const filteredObj = obj?.filter(item => {
      const itemDate = new Date(item[prop]);
      return itemDate >= sixMonthsAgo && itemDate <= today;
    });
  
    const groupedData = filteredObj?.reduce((acc, item) => {
      const itemDate = new Date(item[prop]);
      const key = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  
    const sortedData = Object.entries(groupedData).sort((a, b) => {
      return new Date(a[0].split('-')[0], a[0].split('-')[1] - 1) - new Date(b[0].split('-')[0], b[0].split('-')[1] - 1);
    });
  
    setGroupedSixMonthActivities(sortedData.map(([date, activities]) => [date, activities]));
  };
  
	return (
		<Container>
			<Wrapper>
				<ChartWrapper>Statistic Activity</ChartWrapper>
				<StatsWrapper>Statistic Category</StatsWrapper>
			</Wrapper>
		</Container>
	);
};

export default StatisticUser;