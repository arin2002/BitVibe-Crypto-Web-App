import React,{useState,useEffect} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card,Row,Col,Input} from 'antd';

// api also
import {useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  // count done to show top 10 only
  const count = simplified ? 10 : 100;

  // destructure into data
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // use state is used to dyamically show and render data
  // destructured too coins array
  const [cryptos, setCryptos] = useState([]);

  // this use state is for searching
  const [searchTerm, setSearchTerm] = useState('')

  // this function will get executed whenever one of these values get changed
  useEffect(() =>{
    // The .filter() method is a built-in JavaScript array method that creates a new array containing all elements from the original array that satisfy a provided condition. It iterates over each element of the array and executes a callback function, passing the current element as an argument. The callback function should return true or false based on the filtering condition.

    // const evenNumbers = numbers.filter((num) => num % 2 === 0);

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  },[cryptosList,searchTerm]);

  if (isFetching) return "Loading.........";
  // console.log(cryptos);
  return (
    <>
      {/* for searching crypto */}
      <div className="search-crypto">
        {simplified ? null: (
          <Input
            placeholder="Search CryptoCurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      
      {/* these are basically spaces between icons */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="no"
                  />
                }
                hoverable
              >
                {/* content */}
                <p>Price: {millify(currency.price)}</p>

                <p>Market Cap: {millify(currency.marketCap)}</p>

                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;