import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


function MyMap(props) {
    return (
        <div className="map-container" ref={props.mapContainer} />
    );
}

export default function LocationComp({ coords }) {
    const [lngLat, setLngLat] = useState(null);
    const mapContainer = React.useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLngLat([position.coords.longitude, position.coords.latitude]);
        });
        // setLngLat(coords)
    }, []);

    console.log(lngLat)

    useEffect(() => {
        if (!lngLat) {
            return;
        }

        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FlZWRjaGFjaGFyOTg3NjU0IiwiYSI6ImNsOG51ZmR4bzA1NTkzb3J1ampqcHd1cG8ifQ.K8kc1_o1iJ6J4HU88F8C2Q';
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [parseInt(coords[0]), parseInt(coords[1])],
            zoom: 14,
        });

        map.on('load', () => {
            map.resize();
        });

        new mapboxgl.Marker()
            .setLngLat([parseInt(coords[0]), parseInt(coords[1])])
            .addTo(map);
    }, [coords]);

    return <MyMap mapContainer={mapContainer} />;
}
