import React, { useState, useEffect } from 'react';

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const locationName = await getLocationName(latitude, longitude);
            setLocation({ latitude, longitude, locationName });
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await response.json();
      const locationName = data.display_name;
      return locationName;
    } catch (error) {
      console.error('Error getting location name:', error.message);
      return null;
    }
  };

  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}, Location: {location.locationName}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default App;