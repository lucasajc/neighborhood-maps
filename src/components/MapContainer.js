import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../App.css';

class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>{
    console.log(props);
    console.log(marker);
    console.log(e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
}
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const { center , locations , markerFocus} = this.props;

    const style = {
      width: '100%',
      height: '100%'
    }

    return (
                 <div>
                   <Map google={this.props.google} style={style} zoom={16} center={center} initialCenter={center} onClick={this.onMapClicked}>
       
                    {locations.map(location => (

                      <Marker
                        title={location.title}
                        position={{lat: location.lat, lng: location.lng}} 
                        onClick={this.onMarkerClick}/>
                      ))}
                    
                    
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div>
                          <h1>{this.state.selectedPlace.title}</h1>
                        </div>
                    </InfoWindow>
                  </Map>
                </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCNvqo698MfJGSTnA1aednek7qyKD_hwhs')
})(MapContainer)
