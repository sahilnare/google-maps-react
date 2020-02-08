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
      carDirections: null,
      busDirections: null,
      distance: 0,
      routeIndex: 0,
      routeEmission: []
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
        depMarkers: [],
        arrMarkers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onIdle: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            // center: refs.map.getCenter(),
          })
        },
        depOnSearchBoxMounted: ref => {
          refs.depSearchBox = ref;
        },
        arrOnSearchBoxMounted: ref => {
          refs.arrSearchBox = ref;
        },
        depOnPlacesChanged: () => {
          const places = refs.depSearchBox.getPlaces();
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
            depMarkers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
        arrOnPlacesChanged: () => {
          const places = refs.arrSearchBox.getPlaces();
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
            arrMarkers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
  }

  getRoute = (e) => {
    this.setState({routeIndex: e})
  }

  getDirections = () => {
      const depLat = this.state.depMarkers[0].position.lat()
      const depLon = this.state.depMarkers[0].position.lng()
      const arrLat = this.state.arrMarkers[0].position.lat()
      const arrLon = this.state.arrMarkers[0].position.lng()
      // let trainDistance, carDistance, busDistance;
      let directions, carDirections, busDirections;

      const DirectionsService1 = new google.maps.DirectionsService();
        DirectionsService1.route({
          origin: new google.maps.LatLng(depLat, depLon),
          destination: new google.maps.LatLng(arrLat, arrLon),
          travelMode: google.maps.TravelMode.TRANSIT,
          provideRouteAlternatives: true,
          // transitOptions: {routingPreference: google.maps.TransitRoutePreference.LESS_WALKING}
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // result.routes[0].legs.forEach((item, i) => {
            //   console.log(item.distance.value)
            // });
            // console.log(result);

            // trainDistance = result.routes[0].legs[0].distance.value;
            // trainDistance = trainDistance/1000

            for(let i = 0; i < result.routes.length; i++) {
              result.routes[i].emissionType = 'train'
              // result.routes[i].co2Value = this.getCO2Value(result.routes[i].legs[0].distance.value, "train")

            }

            directions = result


            // this.setState({
            //   directions: result,
            // });
            console.log(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });

        const DirectionsService2 = new google.maps.DirectionsService();
          DirectionsService2.route({
            origin: new google.maps.LatLng(depLat, depLon),
            destination: new google.maps.LatLng(arrLat, arrLon),
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            // transitOptions: {routingPreference: google.maps.TransitRoutePreference.LESS_WALKING}
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              // result.routes[0].legs.forEach((item, i) => {
              //   console.log(item.distance.value)
              // });

              // console.log(result.routes);

              // carDistance = result.routes[0].legs[0].distance.value;
              // carDistance = carDistance/1000

              for(let i = 0; i < result.routes.length; i++) {
                result.routes[i].emissionType = 'car'
                // result.routes[i].co2Value = this.getCO2Value(result.routes[i].legs[0].distance.value, "car")
              }

              carDirections = result

              // this.setState({
              //   carDirections: result,
              // });
              console.log(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });

          const DirectionsService3 = new google.maps.DirectionsService();
            DirectionsService3.route({
              origin: new google.maps.LatLng(depLat, depLon),
              destination: new google.maps.LatLng(arrLat, arrLon),
              travelMode: google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: true,
              // transitOptions: {routingPreference: google.maps.TransitRoutePreference.LESS_WALKING}
            }, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                // result.routes[0].legs.forEach((item, i) => {
                //   console.log(item.distance.value)
                // });

                // console.log(result.routes);

                // busDistance = result.routes[0].legs[0].distance.value;
                // busDistance = busDistance/1000

                for(let i = 0; i < result.routes.length; i++) {
                  result.routes[i].emissionType = 'bus'
                  // result.routes[i].co2Value = this.getCO2Value(result.routes[i].legs[0].distance.value, "bus")
                }
                console.log(result);

                busDirections = result

                // this.setState({
                //   busDirections: result,
                // });


              } else {
                console.error(`error fetching directions ${result}`);
              }
            });

            this.setState({
              directions: directions,
              carDirections: carDirections,
              busDirections: busDirections
            })
            console.log(this.state);



  }

  getCO2Value = (totalDistance, type) => {

    switch(type) {
      case "car": {
        var url = 'https://cors-anywhere.herokuapp.com/https://api.carbonkit.net/3.6/categories/Other_regional_road_transport_by_Greenhouse_Gas_Protocol/calculation?type=passenger+car&fuel=gasoline&emissionStandard=2005-present&uid=2E35U429HR99&values.distance=' + totalDistance;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", "Basic c2FoaWxuYXJlNzg6I2Zkc2VIc3hla3JlOjM0NQ==");
        //xhr.setRequestHeader("Host", "api.carbonkit.net");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        let co2value = 0;

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var resp = JSON.parse(xhr.responseText);
            //alert(resp)

            co2value = resp.output.amounts[0].value
            console.log(resp.output);
          }
        }
        xhr.send();

        return co2value
        break
      }
      case "bus": {
        var url2 = 'https://cors-anywhere.herokuapp.com/https://api.carbonkit.net/3.6/categories/Other_regional_road_transport_by_Greenhouse_Gas_Protocol/calculation?type=bus&fuel=gasoline&uid=X2WWWW5T64LH&values.distance=' + totalDistance;
        var xhr2 = new XMLHttpRequest();

        xhr2.open("GET", url2, false);
        xhr2.setRequestHeader("Accept", "application/json");
        xhr2.setRequestHeader("Authorization", "Basic c2FoaWxuYXJlNzg6I2Zkc2VIc3hla3JlOjM0NQ==");
        //xhr.setRequestHeader("Host", "api.carbonkit.net");
        xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");

        let co2value = 0;

        xhr2.onreadystatechange = function() {
          if (xhr2.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var resp = JSON.parse(xhr2.responseText);
            //alert(resp)

            co2value = resp.output.amounts[0].value
            console.log(resp.output);
          }
        }
        xhr2.send();

        return co2value
        break
      }
      case "train": {
        var url3 = 'https://cors-anywhere.herokuapp.com/https://api.carbonkit.net/3.6/categories/Passenger_transport_by_Greenhouse_Gas_Protocol/calculation?type=train&subtype=national&region=other&uid=SLHD0UKMOFUL&values.distance=' + totalDistance;
        var xhr3 = new XMLHttpRequest();

        xhr3.open("GET", url3, false);
        xhr3.setRequestHeader("Accept", "application/json");
        xhr3.setRequestHeader("Authorization", "Basic c2FoaWxuYXJlNzg6I2Zkc2VIc3hla3JlOjM0NQ==");
        //xhr.setRequestHeader("Host", "api.carbonkit.net");
        xhr3.setRequestHeader("Access-Control-Allow-Origin", "*");

        let co2value = 0;

        xhr3.onreadystatechange = function() {
          if (xhr3.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var resp = JSON.parse(xhr3.responseText);
            //alert(resp)

            co2value = resp.output.amounts[0].value
            console.log(resp.output);
          }
        }
        xhr3.send();

        return co2value
        break
      }
      default:
        break
    }

  }


	render() {
		return (
      <div>
			<Map
        routeIndex={this.state.routeIndex}
        getRoute={this.getRoute}
        depMarkers={this.state.depMarkers}
				arrMarkers={this.state.arrMarkers}
        center={this.state.center}
        onMapMounted={this.state.onMapMounted}
        onIdle={this.state.onIdle}
        bounds={this.state.bounds}
        depOnPlacesChanged={this.state.depOnPlacesChanged}
        depOnSearchBoxMounted={this.state.depOnSearchBoxMounted}
        arrOnPlacesChanged={this.state.arrOnPlacesChanged}
        arrOnSearchBoxMounted={this.state.arrOnSearchBoxMounted}
        directions={this.state.directions}
        carDirections={this.state.carDirections}
        busDirections={this.state.busDirections}
				googleMapURL={url}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `1000px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
      <button onClick={this.getDirections}>Get directions</button>
      <h1>distance: {this.state.distance} km</h1>
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
