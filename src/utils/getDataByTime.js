// import React, {useState} from "react";

export const getDataSevenDaysAgo = async (obj, prop) => {
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

    const groupedData = await filteredObj?.reduce((acc, item) => {
        const itemDate = new Date(item[prop]);
        const key = itemDate.toISOString().split("T")[0];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    const sortedData = Object.entries(groupedData).sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
    });

    return sortedData.map(([date, activities]) => [date, activities]);
};

export const getDataThisMonth = async (obj, prop) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const filteredObj = obj?.filter(item => {
        const itemDate = new Date(item[prop]);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });

    const groupedData = await filteredObj?.reduce((acc, item) => {
        const itemDate = new Date(item[prop]);
        const weekNumber = Math.ceil(
            (itemDate.getDate() - startOfMonth.getDate() + startOfMonth.getDay()) /
                7
        );
        const key = `${itemDate.getFullYear()}-${
            itemDate.getMonth() + 1
        }-Week${weekNumber}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    const sortedData = Object.entries(groupedData).sort((a, b) => {
        return (
            new Date(
                a[0].split("-")[0],
                a[0].split("-")[1] - 1,
                parseInt(a[0].split("-")[2].substring(4))
            ) -
            new Date(
                b[0].split("-")[0],
                b[0].split("-")[1] - 1,
                parseInt(b[0].split("-")[2].substring(4))
            )
        );
    });

    return sortedData.map(([date, activities]) => [date, activities])
};

export const getDataLastSixMonths = async (obj, prop) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const filteredObj = obj?.filter(item => {
        const itemDate = new Date(item[prop]);
        return itemDate >= sixMonthsAgo && itemDate <= today;
    });

    const groupedData = await filteredObj?.reduce((acc, item) => {
        const itemDate = new Date(item[prop]);
        const key = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    const sortedData = Object.entries(groupedData).sort((a, b) => {
        return (
            new Date(a[0].split("-")[0], a[0].split("-")[1] - 1) -
            new Date(b[0].split("-")[0], b[0].split("-")[1] - 1)
        );
    });
    
    return sortedData.map(([date, activities]) => [date, activities])
};