import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://resenha.app/publico/recursos/imagens/ui/pin001.png',
    iconUrl: 'https://resenha.app/publico/recursos/imagens/ui/pin002.png',
    shadowUrl: 'https://resenha.app/publico/recursos/imagens/ui/shadow001.png',
});

export default function Map({ onLocationSelect }) {
    const [userPosition, setUserPosition] = useState([-15.7801, -47.9292]);
    const [marker, setMarker] = useState(null);

    const getMyPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = [position.coords.latitude, position.coords.longitude];
                setUserPosition(newPosition);
            }, (error) => {
                window.alert("Geolocation is not enabled. Using default position.");
            });
        }
    }

    useEffect(() => {
        getMyPosition();
    }, []);

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
                <MapEvents />
            </MapContainer>
        </div>
    )
}
