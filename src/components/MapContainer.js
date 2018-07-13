import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../App.css';

class MapContainer extends Component {



  render() {
    const { center} = this.props;

    const style = {
      width: '100%',
      height: '100%'
    }

    return (
                 <div>
                   <Map google={this.props.google} style={style} zoom={16} initialCenter={center}>
       
                    <Marker name={'Current location'} />
             
                    <InfoWindow>
                        <div>
                          <h1>{'olá'}</h1>
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
