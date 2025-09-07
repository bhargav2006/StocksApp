// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function One() {
//   const API_KEY = "d2dl781r01qi5pq6649gd2dl781r01qi5pq664a0";
//   const DEFAULT_STOCKS = [
//     "AAPL",
//     "TSLA",
//     "MSFT",
//     "AMZN",
//     "META",
//     "GOOGL",
//     "NFLX",
//   ];

//   const [stocksData, setStocksData] = useState({});
//   const [marketNews, setMarketNews] = useState([]);

//   const [search, setSearch] = useState("");
//   const [searchedStock, setSearchedStock] = useState(null);
//   const [companyData, setCompanyData] = useState(null);
//   const [companyNews, setCompanyNews] = useState([]);
//   const [financials, setFinancials] = useState(null);
//   const [earnings, setEarnings] = useState([]);

//   // === Landing Page Fetch: Default Stocks + Market News ===
//   useEffect(() => {
//     async function fetchLandingData() {
//       try {
//         // Default stocks
//         const data = {};
//         for (let sym of DEFAULT_STOCKS) {
//           const res = await axios.get(
//             `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`
//           );
//           data[sym] = res.data;
//         }
//         setStocksData(data);

//         // Market news
//         const newsRes = await axios.get(
//           `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
//         );
//         setMarketNews(newsRes.data);
//       } catch (err) {
//         console.error("Error fetching landing data:", err);
//       }
//     }
//     fetchLandingData();
//   }, []);

//   // === Search ===
//   const searchStock = async () => {
//     if (!search) return;

//     try {
//       // Quote
//       const quoteRes = await axios.get(
//         `https://finnhub.io/api/v1/quote?symbol=${search}&token=${API_KEY}`
//       );

//       // Company Profile
//       const profileRes = await axios.get(
//         `https://finnhub.io/api/v1/stock/profile2?symbol=${search}&token=${API_KEY}`
//       );

//       // Company News (last 1 month range)
//       const today = new Date();
//       const lastMonth = new Date();
//       lastMonth.setMonth(today.getMonth() - 1);

//       const newsRes = await axios.get(
//         `https://finnhub.io/api/v1/company-news?symbol=${search}&from=${
//           lastMonth.toISOString().split("T")[0]
//         }&to=${today.toISOString().split("T")[0]}&token=${API_KEY}`
//       );

//       // Financials
//       const financialsRes = await axios.get(
//         `https://finnhub.io/api/v1/stock/metric?symbol=${search}&metric=all&token=${API_KEY}`
//       );

//       // Earnings
//       const earningsRes = await axios.get(
//         `https://finnhub.io/api/v1/stock/earnings?symbol=${search}&token=${API_KEY}`
//       );

//       setSearchedStock({ symbol: search, ...quoteRes.data });
//       setCompanyData(profileRes.data);
//       setCompanyNews(newsRes.data);
//       setFinancials(financialsRes.data);
//       setEarnings(earningsRes.data);
//     } catch (err) {
//       console.error("Error fetching search data:", err);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to Live Stocks Webpage</h1>

//       {/* === Default Stocks === */}
//       <div
//         style={{
//           border: "2px solid black",
//           padding: "10px",
//           marginBottom: "20px",
//         }}>
//         <h2>Default Stocks</h2>
//         <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//           {Object.keys(stocksData).map((key) => (
//             <div
//               key={key}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 width: "250px",
//               }}>
//               <strong>{key}</strong>
//               <ul>
//                 {Object.entries(stocksData[key]).map(([k, v]) => (
//                   <li key={k}>
//                     {k}: {v}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* === Market News === */}
//       <div
//         style={{
//           border: "2px solid black",
//           padding: "10px",
//           marginBottom: "20px",
//         }}>
//         <h2>Market News</h2>
//         <ul>
//           {marketNews.slice(0, 5).map((news, i) => (
//             <li key={i}>
//               <img src={news.image} alt="news" width="100" />
//               <strong>{news.headline}</strong> ({news.source}) <br />
//               <em>{new Date(news.datetime * 1000).toLocaleString()}</em>
//               <br />
//               {news.summary}
//               <br />
//               <a href={news.url} target="_blank">
//                 Read more
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* === Search Input === */}
//       <div
//         style={{
//           border: "2px solid black",
//           padding: "10px",
//           marginBottom: "20px",
//         }}>
//         <h2>Search for a Company</h2>
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value.toUpperCase())}
//           placeholder="Enter stock symbol..."
//         />
//         <button onClick={searchStock}>Search</button>
//       </div>

//       {/* === Search Results === */}
//       {searchedStock && (
//         <div
//           style={{
//             border: "2px solid green",
//             padding: "10px",
//             marginBottom: "20px",
//           }}>
//           <h3>Stock Data ({searchedStock.symbol})</h3>
//           <ul>
//             {Object.entries(searchedStock).map(
//               ([k, v]) =>
//                 k !== "symbol" && (
//                   <li key={k}>
//                     {k}: {v}
//                   </li>
//                 )
//             )}
//           </ul>
//         </div>
//       )}

//       {companyData && (
//         <div
//           style={{
//             border: "2px solid blue",
//             padding: "10px",
//             marginBottom: "20px",
//           }}>
//           <h3>Company Details</h3>
//           <ul>
//             {Object.entries(companyData).map(([k, v]) => (
//               <li key={k}>
//                 {k}: {v}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {companyNews.length > 0 && (
//         <div
//           style={{
//             border: "2px solid orange",
//             padding: "10px",
//             marginBottom: "20px",
//           }}>
//           <h3>Company News</h3>
//           <ul>
//             {companyNews.slice(0, 5).map((news, i) => (
//               <li key={i}>
//                 <strong>{news.headline}</strong> ({news.source}) <br />
//                 {news.summary} <br />
//                 <a href={news.url} target="_blank" rel="noopener noreferrer">
//                   Read more
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {financials && (
//         <div
//           style={{
//             border: "2px solid purple",
//             padding: "10px",
//             marginBottom: "20px",
//           }}>
//           <h3>Basic Financials</h3>
//           <ul>
//             {Object.entries(financials.metric).map(([k, v]) => (
//               <li key={k}>
//                 {k}: {v}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {earnings.length > 0 && (
//         <div
//           style={{
//             border: "2px solid red",
//             padding: "10px",
//             marginBottom: "20px",
//           }}>
//           <h3>Earnings Surprises</h3>
//           <ul>
//             {earnings.slice(0, 4).map((e, i) => (
//               <li key={i}>
//                 {e.period} | Actual: {e.actual} | Estimate: {e.estimate} |
//                 Surprise: {e.surprise} ({e.surprisePercent}%)
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
