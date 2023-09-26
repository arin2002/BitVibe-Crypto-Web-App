import React from 'react'
import { Line } from 'react-chartjs-2'
import {Col,Row,Typography} from 'antd';
// import Chart from "chart.js/auto";

const {Title} = Typography;

// jo bhe function mai daale te render karte time
// through props access kar rahe h bas
const LineChart = ({coinHistory, currentPrice, coinName}) => {

    // loop over coinhistory to get timestamp and price
    const coinPrice = [];
    const coinTimestamp = [];

    const arr = coinHistory?.data?.history;

    for (let i = 0; i < arr?.length; i++) {
      // insert new element to the start not at back
      coinPrice.unshift(arr[i]?.price);

      let timestamp = arr[i]?.timestamp;
      // Check if timestamp is in seconds and convert it to milliseconds if needed
      if (timestamp.toString().length === 10) {
        timestamp *= 1000;
      }

      const options = { month: "numeric", day: "numeric", year: "numeric" };
      const date = new Date(timestamp).toLocaleDateString(undefined, options);
      coinTimestamp.unshift(date);
    }

    // created objects
    const data = {
        labels: coinTimestamp,
        // array
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            },
        ],
    };

    const options = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>

        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>

          <Title level={5} className="current-price">
            Current{coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>

      {/* now chart creation */}
      <Line data={data} options={options} />
    </>
    );
}

export default LineChart