/*global google*/

import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

export const Map = (props) => {
  const [directions, setDirections] = useState(null)

  const directionsService = new google.maps.DirectionsService();

  useEffect(() => {
    directionsService.route(
      {
        origin: props.origin,
        destination: props.destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [props])

  const MapWithDirections = withGoogleMap(props => (
    <GoogleMap
    >
      <DirectionsRenderer
        directions={directions}
      />
    </GoogleMap>
  ));

  return (
    <div>
      <MapWithDirections
        containerElement={<div style={
          { height: `500px`, width: "500px"}} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
