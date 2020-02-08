/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import Marker from "./Marker";

const Map2 = withScriptjs(withGoogleMap((props) =>{


  return (
      <GoogleMap
        defaultZoom={14}
        center={props.center}
        ref={props.onMapMounted}
        onBoundsChanged={props.onBoundsChanged}
        >
        <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {/*<SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_RIGHT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>*/}
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
      </GoogleMap>
    );
  }
))

export default Map2;
