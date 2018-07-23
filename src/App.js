import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import SearchContainer from "./components/SearchContainer";
import MapContainer from "./components/MapContainer";
import {GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";

const apiKey = 'AIzaSyCNvqo698MfJGSTnA1aednek7qyKD_hwhs';

class App extends Component {

  state = {
    mapCenter:{
            lat: -19.932100,
            lng: -43.938072
    },
    markerFocus: {},
    searchResults: [],
    visibleLocations: [],
    plottedLocations: [
      {
          title: 'Centro Cultural Banco do Brasil',
          lat: -19.932453,
          lng:  -43.93704,
          type: 'Museum'
      },
      {
          title: 'MM Gerdau – Museu das Minas e do Metal',
          lat: -19.9321781,
          lng: -43.9387561,
          type: 'Museum'
      },
      {
          title: 'Savá Pub E Café',
          lat: -19.9373851,
          lng: -43.93584360000001,
          type:  'Restaurant'
      },
      {
          title: 'Shopping Pátio Savassi',
          lat: -19.9412377,
          lng: -43.9339918,
          type:  'Shopping'
      },
      {
          title: 'Casa dos Contos',
          lat: -19.934805 ,
          lng: -43.9317624,
          type: 'Restaurant'
      },
      {
          title: 'Svärten Mugg Taverna',
          lat: -19.9342612,
          lng: -43.9354388,
          type: 'Pub'
      },
      {
          title: 'Morada Mexicana',
          lat: -19.93862,
          lng: -43.9340746,
          type: 'Restaurant'
      },
      {
          title: 'Burger King',
          lat: -19.9371606,
          lng: -43.9354034,
          type: 'Restaurant'
      },
      {
          title: 'Stadt Jever',
          lat: -19.9400223,
          lng: -43.9311574,
          type: 'Pub'
      }
    ]
  }

  /**
   * @description invoked immediately after the component is mounted
   */
  componentDidMount() {
    this.setState({visibleLocations: this.state.plottedLocations});
  }

  filterPlaces = query=>{
    this.setState({visibleLocations: this.state.plottedLocations.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))});
  }

  searchPlaces = query=>{

    this.setState({ searchResults: [] });

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(apiKey);
    // Make sure the address isn't blank.
        if (query === '') {
          console.log('You must enter an area, or address.');
        } else {
          // Get latidude & longitude from address.
          Geocode.fromAddress(query).then(
            response => {
              response.results.map(item=>{
                  // Get address from latidude & longitude.
                  const { lat, lng } = item.geometry.location;
                  Geocode.fromLatLng(lat, lng).then(
                  response => {
                    this.setState({ searchResults: response.results});
                    console.log(this.state.searchResults);
                  },
                  error => {
                    console.error(error);
                  }
                );
              });
            },
            error => {
              //TODO tratar zero results
              console.error(error);
            }
          );

        }
  }

  viewMarker = location => {
    this.setState({ markerFocus: this.state.plottedLocations.find(item => item.title === location)});
  }

  //plotMarker = location => {

  //  var requiredLocation = this.state.searchResults.find(item => item.place_id === location);
  //  this.setState({plottedLocations: this.state.plottedLocations.concat(requiredLocation)})
  //  this.setState({mapCenter: {lat:requiredLocation.geometry.location.lat,lng:requiredLocation.geometry.location.lng}})
  //  
  //}

  render() {
    return (

      <div className="rootBox">
        <Route
            exact path="/"
            render={() => (
              <div>
                <div className="searchScroll"></div>
                <div className="searchBox">
                  <SearchContainer
                    onSearch={this.filterPlaces}
                    onRequireMarker={this.viewMarker}
                    locations={this.state.visibleLocations}
                  />
                </div>
                <div className="mapBox">
                   <MapContainer
                    center={this.state.mapCenter}
                    locations = {this.state.visibleLocations}
                    markerFocus = {this.state.markerFocus}
                    />
                </div>
                 
                
               </div>
            )}
        />
      </div>

     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(App)
