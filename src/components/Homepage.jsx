import React from 'react'
// millify for formatting numbers
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import { Link } from 'react-router-dom'

import {Cryptocurrencies,News} from '../components'
import { useGetCryptosQuery } from '../services/cryptoApi'
// shortcut to use
// typography is title
const {Title} = Typography

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  // console.log(data);     

  // take some time to load
  // this is the function provided by redux
  // to tell that our data is begin fetched or not
  // return type is true or false
  if (isFetching) return "Loading....";

  // retriving the data
  // we can use without ? also but
  // ques mark is used to check for null values
  // This syntax is useful when you are working with data that may not be fully available or populated
  const globalStats = data?.data?.stats;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {/* add some rows */}

      <Row>
        {/* span means it will take 12 spaces */}
        {/* half width */}
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.total}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>

      {/* display of crytp currencies */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>

        <Title level={3} className="show-more">
          <Link to={"/cryptocurrencies"}>Show More</Link>
        </Title>
      </div>

      {/* new component */}
      {/* this simplified is bascially prop
      it is used by me to show only data limited
      can say acting as a flag */}
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>

        <Title level={3} className="show-more">
          <Link to={"/news"}>Show More</Link>
        </Title>
      </div>

      {/* new component */}
      <News simplified />
    </>
  );
}

export default Homepage