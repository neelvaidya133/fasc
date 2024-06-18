import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const locs = [
  {
    name: "shop1",
    lat: 43.418693264009626,
    lon: -80.38306742672081,
  },
];

const App = () => {
  const [nearestShop, setNearestShop] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Requesting geolocation...");
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const showPosition = (position) => {
    console.log("Geolocation success:", position);
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    setUserPosition({ lat: userLat, lon: userLon });
    const nearestShop = getNearestLocation(userLat, userLon);
    setNearestShop(nearestShop);
    getEstimatedTravelTime(userLat, userLon, nearestShop.lat, nearestShop.lon);
  };

  const handleError = (error) => {
    console.error("Geolocation error:", error);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  const getNearestLocation = (userLat, userLon) => {
    let nearestDistance = Infinity;
    let nearestShop = null;

    locs.forEach((shop) => {
      const distance = calculateDistance(userLat, userLon, shop.lat, shop.lon);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestShop = shop;
      }
    });

    return nearestShop;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getEstimatedTravelTime = async (startLat, startLon, endLat, endLon) => {
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248de1152da7fc14569bee3866e015a9f56&start=${startLon},${startLat}&end=${endLon},${endLat}`
      );
      const duration =
        response.data.features[0].properties.segments[0].duration;
      const time = Math.round(duration / 60); // Convert seconds to minutes
      setTravelTime(time);
    } catch (error) {
      console.error("Error fetching travel time:", error);
    }
  };

  return (
    <div>
      <h1>Find Your Nearest Drop-off Shop</h1>
      {error && <p>{error}</p>}
      {userPosition ? (
        <MapContainer
          center={[userPosition.lat, userPosition.lon]}
          zoom={13}
          style={{ height: "450px", width: "100%" }}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[userPosition.lat, userPosition.lon]}>
            <Popup>You are here</Popup>
          </Marker>

          {nearestShop && (
            <Marker position={[nearestShop.lat, nearestShop.lon]}>
              <Popup>{nearestShop.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Fetching your location...</p>
      )}

      {nearestShop && (
        <div>
          <p>The nearest shop is {nearestShop.name}.</p>
          <p>Estimated travel time: {travelTime} minute(s)</p>

          <a
            className="directions-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${nearestShop.lat},${nearestShop.lon}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
