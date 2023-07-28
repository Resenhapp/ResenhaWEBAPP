import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

let L, MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap;

if (typeof window !== 'undefined') {
  L = require('leaflet');
  const leafletReact = require('react-leaflet');
  MapContainer = leafletReact.MapContainer;
  TileLayer = leafletReact.TileLayer;
  Marker = leafletReact.Marker;
  Popup = leafletReact.Popup;
  useMapEvents = leafletReact.useMapEvents;
  useMap = leafletReact.useMap;

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://media.resenha.app/s/ui/pin001.png',
    iconUrl: 'https://media.resenha.app/s/ui/pin001.png',
    shadowUrl: 'https://media.resenha.app/s/ui/shadow001.png',
  });
}

export default function Map({ onLocationSelect, displayPartiesAround, partyData }) {
    const [partiesAround, setPartiesAround] = useState([]);
    
    const [userPosition, setUserPosition] = useState([-15.7801, -47.9292]);
    const [marker, setMarker] = useState(null);
    const [clientSide, setClientSide] = useState(false);

    const getMyPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = [position.coords.latitude, position.coords.longitude];
                setUserPosition(newPosition);
            });
        }
    }

    useEffect(() => {
        setClientSide(true);
        getMyPosition();

        if (partyData) {
            const newPartiesAround = partyData.map(item => {
                return `${item.coordinates.lat}, ${item.coordinates.lon}`;
            });
    
            setPartiesAround(oldParties => [...oldParties, ...newPartiesAround]);
        }
    }, [partyData]);

    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    };

    const reverseGeocode = async (lat, lon) => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const addressDetails = res.data.address;
    
        const city = addressDetails.city || 'Não disponível';
        const state = addressDetails.state || 'Não disponível';
        const suburb = addressDetails.suburb || addressDetails.neighbourhood || 'Não disponível';
        const postcode = addressDetails.postcode || 'Não disponível';
    
        return `${city} - ${state}, ${suburb}, ${postcode}`;
    }

    const MapEvents = () => {
        useMapEvents({
            click: async (e) => {
                setMarker(e.latlng);
                const address = await reverseGeocode(e.latlng.lat, e.latlng.lng);
                onLocationSelect(address);
            },
        });
        return null;
    };

    if (!clientSide) {
        return null;
    }

    return (
        <div>
            <MapContainer center={userPosition} zoom={13} className='rounded-xl' style={{ height: "75vh", width: "75vw" }}>
    <ChangeView center={userPosition} zoom={13} />
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {marker && (
        <Marker position={marker}>
            <Popup>
                Você tocou aqui: <br /> {marker.lat}, {marker.lng}
            </Popup>
        </Marker>
    )}
    {partiesAround.map((party, index) => {
        const [lat, lon] = party.split(',').map(Number);
        return (
            <Marker key={index} position={[lat, lon]}>
                <Popup>
                    Party location: <br /> {lat}, {lon}
                </Popup>
            </Marker>
        );
    })}
    <MapEvents />
</MapContainer>

        </div>
    )
}
