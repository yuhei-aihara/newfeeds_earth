import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

function NewsFeed({ news }) {
  return (
    <div className="news-feed" style={{ width: "50%", overflowY: "scroll", maxHeight: "100vh" }}>
      {news.map((article, index) => (
        <div key={index} className="news-item">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          {index !== news.length - 1 && <hr />} {/* 区切り線 */}
        </div>
      ))}
    </div>
  );
}




function MyMap() {
  const position = [51.505, -0.09];
  return (
    <div style={{ width: "50%" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=07d2a64ce0d84bcc959452daeb7667e8');
      const data = await response.json();
      setNews(data.articles);
    };

    fetchData();
  }, []);

  return (
    <div className="App" style={{ display: "flex" }}>
      <NewsFeed news={news} />
      <MyMap />
    </div>
  );
}

export default App;
