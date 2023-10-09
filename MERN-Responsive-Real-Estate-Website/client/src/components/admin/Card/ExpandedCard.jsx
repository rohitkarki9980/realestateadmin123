import React,{useState, useEffect} from 'react';
import './Card.css'
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { request } from "../../../util/fetchAPI";

const ExpandedCard = ({setExpanded}) => {
    const { user, token } = useSelector((state) => state.auth);
    const [createdDates,setDates]=useState(null)

    useEffect(() => {
        const dates = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/user/userDate`, "GET", options);

        setDates(data.dates);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    dates()
    }, [token]);

    const data = {
        options: {
          chart: {
            type: "area",
            height: "auto",
          },
    
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.35,
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
            colors: ["white"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: true,
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
            
          },
          series:{
            name:"Usercount",
             data: [31, 40, 28, 51, 42, 109, 100],
          }
        },
      };
  return (
    <div >
     <motion.div
      className="ExpandedCard"
      style={{
        background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
        <span>userCount</span>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
    </div>
  );
}

export default ExpandedCard;
