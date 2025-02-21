import React, { useEffect, useState } from "react";
import LocationPicker from "../components/forms/LocationPicker";
import { searchClubsByLocationAPI } from "../api/clients/clubApi";

const GeoLocationPage = () => {
const [coordinates, setCoordinates] = useState(null);
const [clubs, setClubs] = useState([]);

useEffect(() => {
  const fetchClubs = async () => {
    if (!coordinates) return;
    try {
      const response = await searchClubsByLocationAPI({ latitude: coordinates[1], longitude: coordinates[0] });
      if(response.clubs.length > 0){
        setClubs(response.clubs);
      }
    } catch (error) {
      console.error("クラブの取得に失敗しました", error);
    }
  };
  fetchClubs();
}, [coordinates]);

  return (
  <div>
    dqjdqjdqd
    <h1>GeoLocationPage</h1>
    <LocationPicker setCoordinates={setCoordinates} clubs={clubs} mode="search"/>
  </div>
  );
};

export default GeoLocationPage;