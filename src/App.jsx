import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [itinerario, setItinerario] = useState([]);
  const [myCoords, setMyCoords] = useState({});

  const sla =  {
    center: {
      lat: -30.03,
      lng: -51.23
    },
    zoom: 11
  };

  useEffect(async () => {
    setInterval(async () => {
      const response = await axios.get('http://localhost:4000/');
      setCars(response.data.veiculos);
    }, 500);

    const response = await axios.get('http://localhost:4000/itinerario');
    setItinerario(response.data.itinerarios);

    navigator.geolocation.getCurrentPosition(pos => setMyCoords(pos.coords));
  }, []);



  return (
      <GoogleMapReact
          defaultCenter={sla.center}
          defaultZoom={sla.zoom}
      >
        {itinerario.map(({ coordX , coordY}) => (
          <div className="point" lat={coordY} lng={coordX} />
          ))}
        {cars.map(({lat, long, numVeicGestor}) => (
          <div className="thalles" lat={lat} lng={long}>{numVeicGestor}</div>
        ))}
        <div className="thalles" lat={myCoords.latitude} lng={myCoords.longitude}>thallles</div>
      </GoogleMapReact>
  );
}

export default App;
