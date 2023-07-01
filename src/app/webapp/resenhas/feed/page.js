'use client'
import DateScroll from '@/src/components/DateScroll';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import Vector from '@/src/components/Vector';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon-2x.png',
    iconUrl: 'https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-shadow.png',
});


export default function Map() {
    const [userPosition, setUserPosition] = useState([-15.7801, -47.9292]);
    const [userPositionToAddress, setUserPositionToAddress] = useState('');
    const [markers, setMarkers] = useState([]);
    const [search, setSearch] = useState('');

    const reverseGeocode = async (latitude, longitude) => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        return res.data.display_name;
    }

    const geocode = async (address) => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        if(res.data && res.data.length > 0) {
            return [res.data[0].lat, res.data[0].lon];
        } else {
            throw new Error("No results found");
        }
    }

    const handleSearch = async () => {
        try {
            const coords = await geocode(search);
            setUserPosition(coords);
            const address = await reverseGeocode(coords[0], coords[1]);
            setUserPositionToAddress(address);
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    }

    

    const getMyPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const newPosition = [position.coords.latitude, position.coords.longitude];
                setUserPosition(newPosition);
                const address = await reverseGeocode(newPosition[0], newPosition[1]);
                setUserPositionToAddress(address);
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

    const Markers = () => {
        useMapEvents({
            click: (e) => {
                const newMarker = e.latlng;
                setMarkers([...markers, newMarker]);
                console.log("Coordinates: ", newMarker);
            },
        });

        return (
            <>
                {markers.map((position, idx) =>
                    <Marker key={idx} position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Coordinates: {position.lat}, {position.lng}
                        </Popup>
                    </Marker>
                )}
            </>
        );
    };

    return (
        <div className='p-4 gap-2 flex flex-col'>
            <div>Onde que tu tá?</div>
        <div className='w-full flex flex-row rounded-xl bg-purpleT2 px-4 py-2 items-center ring-2 ring-inset ring-purpleT3'>
            <input type='text' className='w-full bg-transparent text-whiteT1' onChange={handleInputChange} />
            <button onClick={handleSearch} className='w-fit h-fit scale-150'>
                <Vector vectorname={'magnifier01'} />
            </button>
        </div>
            <MapContainer center={userPosition} zoom={13} className='rounded-xl' style={{ height: "75vh", width: "100%" }}>
                <ChangeView center={userPosition} zoom={13} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={userPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> {userPosition}
                    </Popup>
                </Marker>
                <Markers />
            </MapContainer>
            <button onClick={getMyPosition} className='w-fit h-fit py-1 px-4 rounded-full ring-2 ring-inset ring-whiteT1 flex flex-row justify-center items-center gap-1 backdrop-blur-xl bg-[#F1F1F14D]'>Me encontre</button>
            <h1>Voce esta em {userPositionToAddress}</h1>
        </div>
    )
}