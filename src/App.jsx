import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [itinerario, setItinerario] = useState([]);

  const api_url = process.env.REACT_APP_API_URL;

  const config =  {
    center: {
      lat: -30.03,
      lng: -51.23
    },
    zoom: 11
  };

  useEffect(async () => {
    setInterval(async () => {
      const response = await axios.get(api_url);
      setCars(response.data.veiculos);
    }, 500);

    const response = await axios.get(api_url + 'itinerario');
    setItinerario(response.data.itinerarios);

  }, []);



  return (
      <GoogleMapReact
          defaultCenter={config.center}
          defaultZoom={config.zoom}
      >
        {itinerario.map(({ coordX , coordY}) => (
          <div className="point" lat={coordY} lng={coordX} />
          ))}
        {cars.map(({lat, long, numVeicGestor}) => (
          <div className="bus" lat={lat} lng={long}>{numVeicGestor}</div>
        ))}
      </GoogleMapReact>
  );
}

export default App;
