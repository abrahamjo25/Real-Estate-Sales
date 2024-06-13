"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default icon fix for React-Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // Set the icon anchor
  popupAnchor: [0, -41], // Set the popup anchor
});

L.Marker.prototype.options.icon = DefaultIcon;
const MapView = ({ selectedPlace, coordinates }) => {
  const defaultPosition = [9.018947, 38.746032];

  // Custom hook to update the map center dynamically
  const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
    return null;
  };
  return (
    <MapContainer
      center={coordinates ? [coordinates[1], coordinates[0]] : defaultPosition}
      zoom={13}
      style={{ height: "80vh", width: "100%" }} // Set height to 80vh
      key={selectedPlace ? selectedPlace : "default"}
    >
      <MapUpdater
        center={
          coordinates ? [coordinates[1], coordinates[0]] : defaultPosition
        }
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
      />
      <Marker
        position={
          coordinates ? [coordinates[1], coordinates[0]] : defaultPosition
        }
      >
        <Popup>
          {selectedPlace ? selectedPlace : "Search a city or specific place"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
