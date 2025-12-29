import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Reverse geocoding (English)
async function getLocationDetails(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${lat}&lon=${lng}`
  );
  const data = await res.json();

  return {
    name:
      data.address?.suburb ||
      data.address?.neighbourhood ||
      data.address?.city ||
      data.display_name ||
      "Unknown location",
    ward:
      data.address?.suburb ||
      data.address?.neighbourhood ||
      "Unknown ward",
    lat,
    lng,
  };
}

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      setPosition(e.latlng);

      const locationDetails = await getLocationDetails(
        e.latlng.lat,
        e.latlng.lng
      );

      onSelect(locationDetails);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapPicker({ setLocation }) {
  return (
    <div style={{ height: "300px", marginBottom: "15px" }}>
      <MapContainer
        center={[13.0827, 80.2707]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={setLocation} />
      </MapContainer>
    </div>
  );
}

export default MapPicker;
