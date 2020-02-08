/* global google */
import React from "react";
import Map from "./Map2";
import url from "../google_maps_key"

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

  componentDidMount() {

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
				markers={this.props.markers}
        directions={this.state.directions}
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
  markers: []
}
