import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Landing.css";
import QuoteChart from "./QuoteChart.jsx";
export default function Landing() {
  const API_KEY = "d2dl781r01qi5pq6649gd2dl781r01qi5pq664a0";
  const DEFAULT_STOCKS = [
    "AAPL", // Apple
    "TSLA", // Tesla
    "MSFT", // Microsoft
    "AMZN", // Amazon
    "META", // Meta (Facebook)
    "GOOGL", // Alphabet (Google)
    "NFLX", // Netflix
    "NVDA", // Nvidia
    "AMD", // Advanced Micro Devices
    "INTC", // Intel
    "BRK.A", // Berkshire Hathaway
    "JPM", // JPMorgan Chase
    "V", // Visa
  ];
  const [stocksData, setStocksData] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [searchProfile, setSearchProfile] = useState(null);
  const [searchQuote, setSearchQuote] = useState(null);
  // const [companyNews, setCompanyNews] = useState([]);

  // const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    async function fetchLandingData() {
      try {
        const data = {};
        for (let sym of DEFAULT_STOCKS) {
          const res = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`
          );
          data[sym] = res.data;
        }
        setStocksData(data);
      } catch (err) {
        console.error("Error fetching landing data:", err);
      }

      // try {
      //   const marketRes = await axios.get(
      //     `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
      //   );

      //   setMarketData(marketRes.data);
      //   console.log(marketRes.data);
      // } catch (err) {
      //   console.error("Error fetching Market data:", err);
      // }
    }
    fetchLandingData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const profileRes = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${searchQuery}&token=${API_KEY}`
      );

      const quoteRes = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${searchQuery}&token=${API_KEY}`
      );

      // const companyRes = await axios.get(
      //   `https://finnhub.io/api/v1/company-news?symbol=${searchQuery}&from=2023-01-01&to=2024-12-31&token=${API_KEY}`
      // );

      setSearchProfile(profileRes.data);
      setSearchQuote(quoteRes.data);
      // setCompanyNews(companyRes.data);
    } catch (err) {
      console.error("Error fetching stock:", err);
    }
  };

  function formatMarketCap(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value}`;
  }

  return (
    <div className="Landing">
      {/* Header bar */}
      <div className="ticker-container bg-dark text-white py-2">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {Object.keys(stocksData).map((sym) => (
              <div key={sym} className="ticker-item">
                <strong>{sym}</strong> ${stocksData[sym].c}{" "}
                <span
                  className={
                    stocksData[sym].dp >= 0 ? "text-success" : "text-danger"
                  }>
                  {stocksData[sym].dp}%
                </span>
              </div>
            ))}
          </div>
          <div className="ticker-content" aria-hidden="true">
            {Object.keys(stocksData).map((sym) => (
              <div key={`${sym}-duplicate`} className="ticker-item">
                <strong>{sym}</strong> ${stocksData[sym].c}{" "}
                <span
                  className={
                    stocksData[sym].dp >= 0 ? "text-success" : "text-danger"
                  }>
                  {stocksData[sym].dp}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h1>Free Stocks Dashboard</h1>
      </div>

      <div className="search-div container mt-3">
        <div className="mb-3 d-flex">
          <input
            type="search"
            placeholder="Search Stock Symbol (e.g. AAPL)"
            className="form-control me-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* === Display Searched Data === */}
        {searchProfile && searchQuote && (
          <div className="card p-3 shadow-sm">
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start mb-3">
                  {searchProfile.logo && (
                    <img
                      src={searchProfile.logo}
                      alt="logo"
                      width="60"
                      height="60"
                      style={{ objectFit: "contain" }}
                      className="me-3"
                    />
                  )}
                  <div>
                    <h4>
                      {searchProfile.name}{" "}
                      <small>({searchProfile.ticker})</small>
                    </h4>
                    <small className="text-muted">
                      {searchProfile.exchange} · {searchProfile.currency}
                      <br />
                      {searchProfile.finnhubIndustry}
                    </small>
                  </div>
                </div>
                <div className="row text-center mb-3">
                  <div className="col-6 col-md-3 mb-2">
                    <div>
                      <strong>Market Cap</strong>
                      <div>
                        {formatMarketCap(searchProfile.marketCapitalization)}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-2">
                    <div>
                      <strong>Shares</strong>
                      <div>{searchProfile.shareOutstanding?.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-2">
                    <div>
                      <strong>IPO</strong>
                      <div>{searchProfile.ipo}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-2">
                    <div>
                      <strong>HQ</strong>
                      <div>{searchProfile.country}</div>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start border-top pt-2 mt-2">
                    <div className="mb-2 mb-md-0">
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${searchProfile.phone}`}>
                        {searchProfile.phone}
                      </a>
                    </div>
                    <div>
                      <strong>Website:</strong>{" "}
                      <a
                        href={searchProfile.weburl}
                        target="_blank"
                        rel="noreferrer">
                        {searchProfile.weburl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <QuoteChart symbol={searchQuery} />
              </div>
            </div>

            {/* <div className="mt-4">
              <h5>Recent News</h5>
              {companyNews.length === 0 && <p>No recent news available.</p>}
              <div className="row">
                {companyNews.slice(0, 4).map((news) => (
                  <div key={news.id} className="col-12 col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{news.headline}</h5>
                        <small className="text-muted">
                          {new Date(news.datetime * 1000).toLocaleString()}
                        </small>
                        <p
                          className="card-text mt-2"
                          style={{ fontSize: "0.95em" }}>
                          {news.summary}
                        </p>
                        <a
                          href={news.url}
                          className="btn btn-sm btn-outline-primary">
                          {news.source} - Read more...
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}
      </div>
      {/* <div className="container mt-4">
        <h4>Market News</h4>
        <div className="row">
          {marketData.slice(0, 4).map((news) => (
            <div key={news.id} className="col-12 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                {news.image && (
                  <img
                    src={news.image}
                    alt={news.image}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{news.headline}</h5>
                  <small className="text-muted">
                    {new Date(news.datetime * 1000).toLocaleString()}
                  </small>
                  <p className="card-text mt-2" style={{ fontSize: "0.95em" }}>
                    {news.summary}
                  </p>
                  <a href={news.url} className="btn btn-sm btn-outline-primary">
                    {news.source} - Read more...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
