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
    searchResults: []
  }

  searchPlaces = query=>{

    this.setState({ searchResults: [] });

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(apiKey);

    console.log(query);
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
                    onSearch={this.searchPlaces}
                    locations={this.state.searchResults}
                  />
                </div>
                <div className="mapBox">
                   <MapContainer
                    center={this.state.mapCenter}
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
