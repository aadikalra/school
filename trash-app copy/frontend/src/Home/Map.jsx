import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapComponent({ address }) {
  const [mapPosition, setMapPosition] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setMapPosition([lat, lon]);
        } else {
          console.error('Geocoding failed: No results found');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <MapContainer
      center={mapPosition}
      zoom={15}
      style={{ width: '100%', height: '800px' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {mapPosition[0] !== 0 && mapPosition[1] !== 0 && (
        <Marker position={mapPosition}>
          <Popup>{address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapComponent;