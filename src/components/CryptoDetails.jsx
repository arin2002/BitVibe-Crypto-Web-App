import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

// basically apis data
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

// component for graph
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  // use params basically url se nikal rahe h id
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')

  // taken out from that
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const { data:coinHistory} = useGetCryptoHistoryQuery({coinId,timePeriod});

  const cryptoDetails = data?.data?.coin;

  // if(isFetching) return "Loading...."

  // console.log(data)
    console.log(cryptoDetails);
    // console.log(coinHistory);
    // console.log(timePeriod)

    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];


    // this is nothing just we are fetching data
    // using api
    const stats = [
      {
        title: "Price to USD",
        value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
        icon: <DollarCircleOutlined />,
      },

      { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${
          cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
        }`,
        icon: <ThunderboltOutlined />,
      },

      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },

      {
        title: "All-time-high(daily avg.)",
        value: `$ ${
          cryptoDetails?.allTimeHigh?.price &&
          millify(cryptoDetails?.allTimeHigh?.price)
        }`,
        icon: <TrophyOutlined />,
      },
    ];

    const genericStats = [
      {
        title: "Number Of Markets",
        value: cryptoDetails?.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number Of Exchanges",
        value: cryptoDetails?.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Aprroved Supply",
        value: cryptoDetails?.supply?.confirmed ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${
          cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
        }`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${
          cryptoDetails?.supply?.circulating &&
          millify(cryptoDetails?.supply?.circulating)
        }`,
        icon: <ExclamationCircleOutlined />,
      },
    ];

    if (isFetching) return "Loading...";

  return (
    // we will have col here
    // basically nothing just rendering code
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price{" "}
          <img
            src={cryptoDetails.iconUrl}
            height={50}
            width={50}
            alt={cryptoDetails.name}
          ></img>
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>

      <Select
        defaultValue={"7d"}
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {/* map on the time array we created above*/}
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {/* line chart karna ab */}
      {/* one more api call for history */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>

          {/* fetch from api show data */}
          {/* er are basically mapping on it and displaying */}
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              {/* render value */}
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        {/* now for other cryptos */}
        {/* same code like bitcoin just minor change */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all crypto currencies</p>
          </Col>

          {/* fetch from api show data */}
          {/* er are basically mapping on it and displaying */}
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              {/* render value */}
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      {/* render all data related to that*/}
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
          </Title>
          {/* iska scene kya ha ki aagr ye use karnege to pata chal jayega uske andar koi html vagera tag use to nhi ho rhe varna use nhi kiya to vo kya karge ki tag ke sath show kar dega */}
          <p>{HTMLReactParser(cryptoDetails.description)}</p>
        </Row>

        {/* rendering links */}
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {/* loop ovver these links */}
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>

              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
