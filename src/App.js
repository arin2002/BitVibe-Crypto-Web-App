import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./app.css";
import {Navbar,CryptoDetails,News,Homepage,Exchanges,Cryptocurrencies,} from "./components";


const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      {/* nav bar routes */}
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
            {/* exact mtlb exact path hona chaiye route ka match */}
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          {/* level is size */}
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            BitVibe <br />
            All rights reserved
          </Typography.Title>

          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App