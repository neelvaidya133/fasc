import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import "./App.css";
const locs = [
  {
    company: "Ayr Home Hardware",
    street: "1148 NORTH HUMBERLAND",
    city: "AYR",
    province: "ON",
    postal_code: "N0B1E0",
    lat: "43.302380",
    lon: "-80.469965",
    location_code: "YATHB",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "Packaging Depot",
    street: "603 COLBORNE ST UNIT 15",
    city: "BRANTFORD",
    province: "ON",
    postal_code: "N3S7S8",
    lat: "43.139647",
    lon: "-80.241904",
    location_code: "YKFFM",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1500",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Staples",
    street: "595 West St",
    city: "Brantford",
    province: "ON",
    postal_code: "N3R7C5",
    lat: "43.169503",
    lon: "-80.247582",
    location_code: "YKFGB",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "CAMBRIDGE CONVENIENCE CENTRE",
    street: "215 BEVERLY ST UNIT 2",
    city: "CAMBRIDGE",
    province: "ON",
    postal_code: "N1R3Z9",
    lat: "43.370033",
    lon: "-80.302368",
    location_code: "YKFGL",
    monday_close: "2130",
    tuesday_close: "2130",
    wednesday_close: "2130",
    thursday_close: "2130",
    friday_close: "2130",
    saturday_close: "2130",
    sunday_close: "2100",
  },
  {
    company: "Bowman's Home Hardware",
    street: "718 KING ST E",
    city: "Cambridge",
    province: "ON",
    postal_code: "N3H3N9",
    lat: "43.395558",
    lon: "-80.358154",
    location_code: "YKFHJ",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "1700",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "FEDEX SHIP CENTRE",
    street: "50 BARNES RD",
    city: "CAMBRIDGE",
    province: "ON",
    postal_code: "N3H4R7",
    lat: "43.418705",
    lon: "-80.383334",
    location_code: "YKFA",
    monday_close: "1930",
    tuesday_close: "1930",
    wednesday_close: "1930",
    thursday_close: "1930",
    friday_close: "1930",
    saturday_close: "1600",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "The Prescription Shoppe",
    street: "2 GEORGE ST N",
    city: "CAMBRIDGE",
    province: "ON",
    postal_code: "N1S2M7",
    lat: "43.358306",
    lon: "-80.318971",
    location_code: "YKFFP",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1500",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Staples",
    street: "26 Pinebush Rd",
    city: "Cambridge",
    province: "ON",
    postal_code: "N1R8K5",
    lat: "43.412053",
    lon: "-80.326112",
    location_code: "YKFFZ",
    monday_close: "2100",
    tuesday_close: "2100",
    wednesday_close: "2100",
    thursday_close: "2100",
    friday_close: "2100",
    saturday_close: "1700",
    sunday_close: "1800",
  },
  {
    company: "Delhi Pharmasave #726",
    street: "221 MAIN ST OF DELHI",
    city: "DELHI",
    province: "ON",
    postal_code: "N4B2M4",
    lat: "42.853608",
    lon: "-80.499472",
    location_code: "YATFF",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1700",
    saturday_close: "1700",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Elmira Home Hardware",
    street: "22 CHURCH ST W",
    city: "ELMIRA",
    province: "ON",
    postal_code: "N3B1M3",
    lat: "43.600419",
    lon: "-80.559103",
    location_code: "YATFE",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1800",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "HASTY MARKET",
    street: "165 TOWER ST N",
    city: "FERGUS",
    province: "ON",
    postal_code: "N1M2Y9",
    lat: "43.703687",
    lon: "-80.380430",
    location_code: "YATFT",
    monday_close: "2200",
    tuesday_close: "2200",
    wednesday_close: "2200",
    thursday_close: "2200",
    friday_close: "2200",
    saturday_close: "2100",
    sunday_close: "2100",
  },
  {
    company: "Staples",
    street: "20 Woodlawn Rd E",
    city: "Guelph",
    province: "ON",
    postal_code: "N1H1G7",
    lat: "43.567336",
    lon: "-80.276186",
    location_code: "YKFFY",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "Staples",
    street: "498 EDINBURGH RD S",
    city: "Guelph",
    province: "ON",
    postal_code: "N1G4Z1",
    lat: "43.521946",
    lon: "-80.234157",
    location_code: "YKFGD",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "U-HAUL NEIGHBOURHOOD DEALER",
    street: "15 CHURCH ST W",
    city: "HAGERSVILLE",
    province: "ON",
    postal_code: "N0A1H0",
    lat: "42.960979",
    lon: "-80.055096",
    location_code: "YATFV",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "1200",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "MARS Lighting & Electrical Supplies",
    street: "31 MANITOU DR UNIT 2",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2C1K9",
    lat: "43.416002",
    lon: "-80.450858",
    location_code: "YKFFW",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "CLOSED ALL DAY",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Sherwood Digital Copy & Print",
    street: "30 DUKE ST W UNIT 110",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2H3W5",
    lat: "43.451663",
    lon: "-80.488908",
    location_code: "YKFFI",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "CLOSED ALL DAY",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "K. C. Convenience",
    street: "601 DOON VILLAGE RD",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2P1T6",
    lat: "43.398137",
    lon: "-80.447588",
    location_code: "YKFGK",
    monday_close: "2100",
    tuesday_close: "2100",
    wednesday_close: "2100",
    thursday_close: "2100",
    friday_close: "2100",
    saturday_close: "2100",
    sunday_close: "2100",
  },
  {
    company: "Kitchener Home Hardware",
    street: "1014 VICTORIA ST N",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2B3C4",
    lat: "43.465704",
    lon: "-80.461083",
    location_code: "YKFHC",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1800",
    sunday_close: "1700",
  },
  {
    company: "KW-PC Cell Phone Repair",
    street: "309 LANCASTER ST W UNIT 1",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2H4V4",
    lat: "43.468955",
    lon: "-80.484568",
    location_code: "YKFFG",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "FARAH FOODS CONVENIENCE STORE",
    street: "210 LORRAINE AVE",
    city: "KITCHENER",
    province: "ON",
    postal_code: "N2B3T4",
    lat: "43.461149",
    lon: "-80.440209",
    location_code: "YKFFT",
    monday_close: "2300",
    tuesday_close: "2300",
    wednesday_close: "2300",
    thursday_close: "2300",
    friday_close: "2300",
    saturday_close: "2300",
    sunday_close: "2100",
  },
  {
    company: "Staples",
    street: "245 Strasburg Rd",
    city: "Kitchener",
    province: "ON",
    postal_code: "N2E3W7",
    lat: "43.425808",
    lon: "-80.488661",
    location_code: "YKFGC",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "Staples",
    street: "225 The Boardwalk Unit 5",
    city: "Kitchener",
    province: "ON",
    postal_code: "N2N0B1",
    lat: "43.434736",
    lon: "-80.562637",
    location_code: "YATFN",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "Village Home Hardware",
    street: "3865 Manser Rd",
    city: "Linwood",
    province: "ON",
    postal_code: "N0B2A0",
    lat: "43.582650",
    lon: "-80.726854",
    location_code: "YATHG",
    monday_close: "1730",
    tuesday_close: "1730",
    wednesday_close: "1730",
    thursday_close: "1730",
    friday_close: "1730",
    saturday_close: "1500",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "LISTOWEL VARIETY",
    street: "115 ARGYLE AVE N",
    city: "LISTOWEL",
    province: "ON",
    postal_code: "N4W1M7",
    lat: "43.732113",
    lon: "-80.954367",
    location_code: "YATFW",
    monday_close: "2100",
    tuesday_close: "2100",
    wednesday_close: "2100",
    thursday_close: "2100",
    friday_close: "2100",
    saturday_close: "2100",
    sunday_close: "2100",
  },
  {
    company: "B&B Pet Supplies",
    street: "51 ONTARIO RD",
    city: "MITCHELL",
    province: "ON",
    postal_code: "N0K1N0",
    lat: "43.467849",
    lon: "-81.196975",
    location_code: "YATFI",
    monday_close: "1730",
    tuesday_close: "1730",
    wednesday_close: "1730",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1400",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "RAM COMPUTERS AND TOOLS",
    street: "130 MAIN ST S",
    city: "MOUNT FOREST",
    province: "ON",
    postal_code: "N0G2L0",
    lat: "43.981436",
    lon: "-80.734890",
    location_code: "YATFX",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "1500",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "The Prescription Shoppe",
    street: "261 MAIN ST WEST",
    city: "PALMERSTON",
    province: "ON",
    postal_code: "N0G2P0",
    lat: "43.834233",
    lon: "-80.850373",
    location_code: "YATFM",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1600",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "REST ACRES PHARMACY",
    street: "1084 REST ACRES RD UNIT 6",
    city: "PARIS",
    province: "ON",
    postal_code: "N3L0B5",
    lat: "43.179039",
    lon: "-80.384438",
    location_code: "YKFGS",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1600",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Plattsville Home Hardware",
    street: "69 ALBERT ST",
    city: "PLATTSVILLE",
    province: "ON",
    postal_code: "N0J1S0",
    lat: "43.303985",
    lon: "-80.616808",
    location_code: "YATFD",
    monday_close: "1800",
    tuesday_close: "1800",
    wednesday_close: "1800",
    thursday_close: "1800",
    friday_close: "1800",
    saturday_close: "1700",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "Staples",
    street: "17 Queensway W",
    city: "Simcoe",
    province: "ON",
    postal_code: "N3Y2M7",
    lat: "42.846770",
    lon: "-80.308750",
    location_code: "YATFQ",
    monday_close: "1900",
    tuesday_close: "1900",
    wednesday_close: "1900",
    thursday_close: "1900",
    friday_close: "1900",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "Van Pelt's Business Solutions",
    street: "800 TALBOT STREET",
    city: "ST THOMAS",
    province: "ON",
    postal_code: "N5P1E2",
    lat: "42.778139",
    lon: "-81.184482",
    location_code: "YXUFQ",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "CLOSED ALL DAY",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "ERIE CONVENIENCE",
    street: "125 ERIE ST",
    city: "STRATFORD",
    province: "ON",
    postal_code: "N5A2M6",
    lat: "43.369031",
    lon: "-80.984400",
    location_code: "YSAFB",
    monday_close: "2100",
    tuesday_close: "2100",
    wednesday_close: "2100",
    thursday_close: "2100",
    friday_close: "2100",
    saturday_close: "2100",
    sunday_close: "2100",
  },
  {
    company: "Staples",
    street: "1076 Ontario St",
    city: "Stratford",
    province: "ON",
    postal_code: "N5A6Z3",
    lat: "43.371468",
    lon: "-80.943970",
    location_code: "YATFP",
    monday_close: "2000",
    tuesday_close: "2000",
    wednesday_close: "2000",
    thursday_close: "2000",
    friday_close: "2000",
    saturday_close: "1700",
    sunday_close: "1700",
  },
  {
    company: "FARAH MARKET EXPRESS",
    street: "242 KING ST N",
    city: "WATERLOO",
    province: "ON",
    postal_code: "N2J2Y7",
    lat: "43.475801",
    lon: "-80.524535",
    location_code: "YKFGQ",
    monday_close: "2300",
    tuesday_close: "2300",
    wednesday_close: "2300",
    thursday_close: "2300",
    friday_close: "2300",
    saturday_close: "2300",
    sunday_close: "2300",
  },
  {
    company: "FARAH MARKET EXPRESS",
    street: "255 WOOLWICH ST UNIT 101",
    city: "WATERLOO",
    province: "ON",
    postal_code: "N2K0C8",
    lat: "43.493409",
    lon: "-80.481127",
    location_code: "YKFGP",
    monday_close: "2300",
    tuesday_close: "2300",
    wednesday_close: "2300",
    thursday_close: "2300",
    friday_close: "2300",
    saturday_close: "2300",
    sunday_close: "2300",
  },
  {
    company: "I.D.A. EASTBRIDGE PHARMACY",
    street: "370 EASTBRIDGE BLVD UNIT 4",
    city: "WATERLOO",
    province: "ON",
    postal_code: "N2K4P1",
    lat: "43.504259",
    lon: "-80.509043",
    location_code: "YKFGT",
    monday_close: "1700",
    tuesday_close: "1700",
    wednesday_close: "1700",
    thursday_close: "1700",
    friday_close: "1700",
    saturday_close: "CLOSED ALL DAY",
    sunday_close: "CLOSED ALL DAY",
  },
  {
    company: "7 DAYS MINI MART",
    street: "465 PHILLIP ST UNIT 3",
    city: "WATERLOO",
    province: "ON",
    postal_code: "N2L6C7",
    lat: "43.484684",
    lon: "-80.540406",
    location_code: "YKFGV",
    monday_close: "1900",
    tuesday_close: "1900",
    wednesday_close: "1900",
    thursday_close: "1900",
    friday_close: "1900",
    saturday_close: "1800",
    sunday_close: "1700",
  },
  {
    company: "Live Switchboard Student Services",
    street: "150 UNIVERSITY AVE W UNIT 5A",
    city: "WATERLOO",
    province: "ON",
    postal_code: "N2L3E4",
    lat: "43.472681",
    lon: "-80.536252",
    location_code: "YKFFA",
    monday_close: "1830",
    tuesday_close: "1830",
    wednesday_close: "1830",
    thursday_close: "1830",
    friday_close: "1830",
    saturday_close: "1800",
    sunday_close: "1800",
  },
  {
    company: "Staples",
    street: "620 King St N",
    city: "Waterloo",
    province: "ON",
    postal_code: "N2V2J5",
    lat: "43.504997",
    lon: "-80.535836",
    location_code: "YKFFX",
    monday_close: "2100",
    tuesday_close: "2100",
    wednesday_close: "2100",
    thursday_close: "2100",
    friday_close: "2100",
    saturday_close: "1700",
    sunday_close: "1800",
  },
  {
    company: "Wellesley Home Hardware Building Centre",
    street: "2196 Gerber Rd",
    city: "Wellesley",
    province: "ON",
    postal_code: "N0B2T0",
    lat: "43.469455",
    lon: "-80.763904",
    location_code: "YATHF",
    monday_close: "1730",
    tuesday_close: "1730",
    wednesday_close: "1730",
    thursday_close: "1730",
    friday_close: "1730",
    saturday_close: "1700",
    sunday_close: "CLOSED ALL DAY",
  },
];

const userIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const shopIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});
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
  const getCurrentDay = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    return days[today.getDay()];
  };
  const isShopOpen = (shop) => {
    const currentDay = getCurrentDay();
    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();
    const closeTime = parseInt(shop[`${currentDay}_close`]);

    return closeTime > currentTime;
  };

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
      <div
        style={{
          backgroundColor: "#4d148c",
          border: "none",
          color: "white",
          textAlign: "center",
          padding: "15px 32px",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "4px 2px",
        }}
      >
        <h1>Find Your Nearest FASC Location</h1>
      </div>
      {error && <p>{error}</p>}
      {userPosition ? (
        <MapContainer
          center={[userPosition.lat, userPosition.lon]}
          zoom={13}
          style={{ height: "350px", width: "100%" }}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[userPosition.lat, userPosition.lon]}
            icon={userIcon}
          >
            <Popup>You are here</Popup>
          </Marker>

          {nearestShop && (
            <Marker
              position={[nearestShop.lat, nearestShop.lon]}
              icon={shopIcon}
            >
              <Popup>{nearestShop.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Fetching your location...</p>
      )}

      {nearestShop && (
        <div className="shop-info-container">
          <div className="shop-info">
            <p>The nearest shop is {nearestShop.company}.</p>
            <p>
              Address: {nearestShop.street}, {nearestShop.city}
            </p>
            <p>Estimated travel time: {travelTime} minute(s)</p>
            <p>
              Location Code: <strong>{nearestShop.location_code}</strong>
            </p>
            <p>
              {nearestShop.company} is currently{" "}
              <strong>{isShopOpen(nearestShop) ? "Open" : "Closed"}. </strong>
              <br />
              <strong>Hours:</strong>
              <br />
              Monday: {nearestShop.monday_close}
              <br />
              Tuesday: {nearestShop.tuesday_close}
              <br />
              Wednesday: {nearestShop.wednesday_close}
              <br />
              Thursday: {nearestShop.thursday_close}
              <br />
              Friday: {nearestShop.friday_close}
              <br />
              Saturday: {nearestShop.saturday_close}
              <br />
              Sunday: {nearestShop.sunday_close}
            </p>
          </div>
          <div className="directions-button-container">
            <a
              className="directions-link"
              href={`https://www.google.com/maps/dir/?api=1&destination=${nearestShop.lat},${nearestShop.lon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
