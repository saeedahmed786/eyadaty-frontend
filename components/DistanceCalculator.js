import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';


const DistanceCalculator = ({ coords, data, updateData }) => {
    const mapContainer = useRef();


    const haversine = (lat1, lng1, lat2, lng2) => {
        console.log(lat1, lng1, lat2, lng2);

        const rad = (x) => {
            return x * Math.PI / 180;
        };
        const R = 6378137; // Earth's mean radius in meter
        const dLat = rad(lat2 - lat1);
        const dLong = rad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; // returns the distance in meter
    };


    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [33.57577149030277, 72.99894209711883],
            zoom: 14,
        });

        const referencePoint = map.getCenter();
        const referenceLat = referencePoint.lat;
        const referenceLng = referencePoint.lng;

        console.log(coords)

        setTimeout(() => {
            const filteredData = data.filter(item => {
                const itemLat = item?.gpsData?.replace(/\s+/g, '').split(",")[1];
                const itemLng = item?.gpsData?.replace(/\s+/g, '').split(",")[0];
                const distance = haversine(referenceLat, referenceLng, parseInt(itemLat), parseInt(itemLng));
                return distance <= 100000;
            });

            updateData(filteredData);

        }, 2000);


        return () => {

        }
    }, []);



    return (
        <div ref={mapContainer}>
            {/* {JSON.stringify(filteredData)} */}
        </div>
    )
}

export default DistanceCalculator
