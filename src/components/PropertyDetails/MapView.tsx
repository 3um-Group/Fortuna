import 'leaflet/dist/leaflet.css'; // Import the leaflet CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface MapViewProps {
  position: LatLngExpression; // Coordinates for the marker
  popupContent: string;       // Content to display in the popup
}

function MapView({ position, popupContent }: MapViewProps) {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {popupContent}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
