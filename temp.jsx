<Row gutters={[32, 32]} className="crypto-card-container">
  {cryptos.map((currency) => {
    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
      <Link to={`/crypto/${currency.id}`}>
        <Card
          title={`${currency.rank}. ${currency.name}`}
          extra={
            <img className="crypto-image" src={currency.iconUrl} alt="no" />
          }
          hoverable
        >
          {/* content */}
          <p>Price: {millify(currency.price)}</p>

          <p>Market Cap: {millify(currency.marketCap)}</p>

          <p>Daily Change: {millify(currency.change)}</p>
        </Card>
      </Link>
    </Col>;
  })}
</Row>;
