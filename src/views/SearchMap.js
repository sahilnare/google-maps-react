/* global google */
import React from "react";
import Map from "./Map2";
import url from "../google_maps_key"
import _ from "lodash"

// const google = window.google;

export default class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      distance: 0,
    }
  }

  componentDidUpdate() {

  }

  componentWillMount() {
    const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 19.07285, lng: 72.8823
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            // center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
  }

  getDirections = () => {
      // const DirectionsService = new google.maps.DirectionsService();
      //
      //   DirectionsService.route({
      //     origin: new google.maps.LatLng(19.07583, 72.88261),
      //     destination: new google.maps.LatLng(19.08356, 72.88765),
      //     travelMode: google.maps.TravelMode.DRIVING,
      //   }, (result, status) => {
      //     if (status === google.maps.DirectionsStatus.OK) {
      //       // result.routes[0].legs.forEach((item, i) => {
      //       //   console.log(item.distance.value)
      //       // });
      //
      //       let totalDistance = result.routes[0].legs[0].distance.value;
      //       totalDistance = totalDistance/1000
      //
      //       this.setState({
      //         directions: result,
      //         distance: totalDistance
      //       });
      //     } else {
      //       console.error(`error fetching directions ${result}`);
      //     }
      //   });
  }


	render() {
		return (
      <div>
			<Map
				markers={this.state.markers}
        center={this.state.center}
        onMapMounted={this.state.onMapMounted}
        onBoundsChanged={this.state.onBoundsChanged}
        bounds={this.state.bounds}
        onPlacesChanged={this.state.onPlacesChanged}
        onSearchBoxMounted={this.state.onSearchBoxMounted}
				googleMapURL={url}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `1000px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
      <button onClick={this.getDirections}>Get directions</button>
      </div>
		);
	}
}

MapContainer.defaultProps = {
  // doctors: [
  //   {
  //     uid: 1,
  //     closestPractice: {
  //       lat: 19.07283,
  //       lon: 72.88261
  //     }
  //   },
  //   {
  //     uid: 2,
  //     closestPractice: {
  //       lat: 19.08356,
  //       lon: 72.88265
  //     }
  //   }
  // ]
  // markers: []
}
