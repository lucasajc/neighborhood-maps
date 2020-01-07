import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { mapStyle } from "./MapStyle.js"
import { locations } from "./Locations.js"
import SearchContainer from "./components/SearchContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

const mapsApiKey = "";
const foursquareClientId = "";
const foursquareApiSecret = "";

/**
 * @description renders the main component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plottedLocations: locations,
      map: "",
      infoWindow: "",
      bouncingMarker: ""
    };

    this.initMap = this.initMap.bind(this);
    this.showInfoWindow = this.showInfoWindow.bind(this);
    this.showListMarker = this.showListMarker.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);
  }

  /**
   * @description invoked immediately after the component is mounted
   */
  componentDidMount() {
    let accessNav = document.getElementById("access_nav");
    let nav = document.getElementById("nav");

    window.initMap = this.initMap;

    getGoogleMapsScript(
      "https://maps.googleapis.com/maps/api/js?key=" +
        mapsApiKey +
        "&callback=initMap"
    );

    //Controls the show/hide event on the search container
    accessNav.addEventListener("click", function(e) {
      if (nav.className === "searchBox hidden") {
        nav.className = "searchBox";
        accessNav.className = "searchScroll open";
      } else {
        nav.className = "searchBox hidden";
        accessNav.className = "searchScroll";
      }

      e.preventDefault();
    });
  }

  /**
   * @description obtains the data from foursquare through a fetch and renders the infoWindow
   * @param {Object} marker - the required marker
   * @param {String} query - the name of the location
   */
  getFoursquareData(marker, query) {
    let self = this;

    let url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      foursquareClientId +
      "&client_secret=" +
      foursquareApiSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&query=" +
      query;

    fetch(url)
      .then(function(response) {
        response.json().then(obj => {
          if (response.status === 200) {
            let venue = obj.response.venues[0];

            let html = '<strong><a href="https://foursquare.com/v/'+venue.id+'" target="_blank">'+venue.name+"</a></strong><br/><br/>"+
                     "<strong>Category: </strong>"+venue.categories[0].name+"<br/>"+
                     "<strong>Address: </strong>"+venue.location.address+"<br/>"+
                     "<strong>Here Now: </strong>"+venue.hereNow.summary+"<br/>"+
                     "<strong>Checkins Count: </strong>"+venue.stats.checkinsCount+"<br/>"+
                     "<strong>Tip Count: </strong>"+venue.stats.tipCount+"<br/>";

            self.state.infoWindow.setContent(html);
          } else {
            self.state.infoWindow.setContent("Error on loading data: location not found");
          }
        });
      })
      .catch(() => {
        self.state.infoWindow.setContent("Error on loading data");
      });
  }

  /**
   * @description shows the infowindow related to the requested marker on the map from the list
   * @param {Object} location - the location of the marker
   */
  showListMarker(location) {
    this.showInfoWindow(
      this.state.plottedLocations.find(item => item.title === location).marker
    );
  }

  /**
   * @description shows the infowindow related to the requested marker
   * @param {Object} marker - the required marker
   */
  showInfoWindow(marker) {
    if (this.state.bouncingMarker) {
      this.state.bouncingMarker.setAnimation(null);
      this.state.infoWindow.close();
    }
    this.setState({
      bouncingMarker: ""
    });

    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({ bouncingMarker: marker });

    this.state.infoWindow.open(this.state.map, marker);
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -150);

    //Get foursquare data by coordinates and by location name
    this.getFoursquareData(
      marker,
      this.state.plottedLocations.find(item => item.marker === marker).title
    );
  }

  /**
   * @description closes the infoWindow and sets it animation to null
   */
  closeInfoWindow() {
    this.state.bouncingMarker.setAnimation(null);
    this.state.infoWindow.close();
    this.setState({
      bouncingMarker: ""
    });
  }

  /**
   * @description build the required information about the marker on location object
   * @param {Object} location - the required location
   * @param {Object} map - the map object
   * @param {boolean} status - marker visible on invisible
   * @param {this} self - closure
   */
  plotMarker(location, map, status, self) {
    let marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(location.lat, location.lng),
      animation: window.google.maps.Animation.DROP,
      map: map
    });

    marker.addListener("click", function() {
      self.showInfoWindow(marker);
    });

    location.marker = marker;
    location.marker.visible = status;
    location.id = Math.floor(Math.random() * 999999 + 1);
  }

  /**
   * @description filter the places on map and on the list according to the query
   * @param {string} query - input text
   */
  filterPlaces(query) {
    let locationBuffer = [];
    this.state.plottedLocations.map(item => {
      if (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      ) {
        item.marker.setVisible(true);
      } else {
        item.marker.setVisible(false);
      }

      locationBuffer.push(item);
    });

    this.setState({ plottedLocations: locationBuffer });
  }

  /**
   * @description build the map with its necessary parameters
   */
  initMap() {
    let self = this;

    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -19.936, lng: -43.938072 },
      zoom: 16,
      styles: mapStyle
    });

    let InfoWindow = new window.google.maps.InfoWindow({});

    InfoWindow.addListener("closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infoWindow: InfoWindow
    });

    let locationBuffer = [];

    this.state.plottedLocations.map(location => {
      self.plotMarker(location, map, true, self);
      locationBuffer.push(location);
    });

    this.setState({
      plottedLocations: locationBuffer
    });
  }

  /**
   * @description renders the component
   * @returns jsx containing the component/routes
   */
  render() {
    return (
      <div className="rootBox" role="main">
        <Route
          exact
          path="/"
          render={() => (
            <div role="group">
              <aside
                id="access_nav"
                className="searchScroll open"
                alt="Show/Hide Search"
              >
                <FontAwesomeIcon
                  className="searchScrollIcon"
                  icon={faArrowsAltH}
                />
              </aside>
              <aside id="nav" className="searchBox">
                <SearchContainer
                  onSearch={this.filterPlaces}
                  locations={this.state.plottedLocations}
                  onRequireMarker={this.showListMarker}
                />
              </aside>
              <main className="mapBox">
                <div id="map" role="application" />
              </main>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;

/**
 * @description Loads the google maps script
 * @param {String} - url required with the api key
 */
function getGoogleMapsScript(URL) {
  let scriptHeader = window.document.getElementsByTagName("script")[0];
  let api = window.document.createElement("script");

  api.src = URL;
  //Loads asynchronously
  api.async = true;

  //Insert the script
  scriptHeader.parentNode.insertBefore(api, scriptHeader);
}
