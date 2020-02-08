/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";

const Map2 = withScriptjs(withGoogleMap((props) =>{

  const markers = props.markers.map((marker, index) => <Marker
                    key={index}
                    position={{lat: marker.position.lat, lng: marker.position.lon}}
                  />);

  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  19.07285, lng: 72.8823 } }
        >
        {markers}
      </GoogleMap>
    );
  }
))

export default Map2;
