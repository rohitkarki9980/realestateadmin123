import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { request } from '../../../util/fetchAPI';
import { useSelector } from 'react-redux';

const CustomerReview = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Bookmarks per Hour",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  });

  const { token } = useSelector((state) => state.auth);
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const fetchListedProperties = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/property/getAll`, 'GET', options);
        setAllProperties(data);

        const bookmarkedTimes = [];
        data.forEach((property) => {
          if (property.bookmarkedUsers && property.bookmarkedUsers.length > 0) {
            bookmarkedTimes.push(property.createdAt);
          }
        });

        const hourBookmarkCounts = {};
        bookmarkedTimes.forEach((timestamp) => {
          const hour = new Date(timestamp).getUTCHours();
          if (hourBookmarkCounts[hour]) {
            hourBookmarkCounts[hour]++;
          } else {
            hourBookmarkCounts[hour] = 1;
          }
        });

        const xValues = Object.keys(hourBookmarkCounts).map((hour) => {
          return new Date().setUTCHours(parseInt(hour), 0, 0, 0);
        });

        const dataPoints = Object.values(hourBookmarkCounts);

        const updatedChartData = {
          ...chartData,
          series: [
            {
              ...chartData.series[0],
              data: dataPoints,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: xValues,
            },
          },
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListedProperties();
  }, [token, chartData]);

  return (
    <div className="BookmarkChart">
      <Chart options={chartData.options} series={chartData.series} type="area" />
    </div>
  );
};

export default CustomerReview;
