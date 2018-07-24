import React, { Component } from 'react';
import '../App.css';

class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    visibleMarkers: []
  };

  /**
   * @description invoked immediately after the component is mounted
   */
  componentDidMount() {

    
  }

  render() {
    const { center , locations , markerFocus} = this.props;

    const style = {
      width: '100%',
      height: '100%'
    }

    return (
                <div>
                </div>
    );
  }
}

export default MapContainer;
