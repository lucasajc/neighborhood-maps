import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import SearchContainer from "./components/SearchContainer";
import MapContainer from "./components/MapContainer";

class App extends Component {

  state = {
    initialCenter:{
            lat: -19.932100,
            lng: -43.938072
    }
  }

  render() {
    return (

      <div className="rootBox">
        <Route
            exact path="/"
            render={() => (
              <div>
                <div className="searchBox">
                  <SearchContainer/>
                </div>
                <div className="mapBox">
                   <MapContainer
                    center={this.state.initialCenter}
                    />
                </div>
                 
                
               </div>
            )}
        />
      </div>

     
    );
  }
}

export default App
