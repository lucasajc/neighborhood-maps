import React, { Component } from 'react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

class SearchItem extends Component {

    /**
   * @description 
   * @param {e} object - The seach event
   */
  handleRequireMarker = e => {
    e.preventDefault();
    if (this.props.onRequireMarker)
      this.props.onRequireMarker(e.target.id);
  };

  render() {
    const {location} = this.props;

     
    
    return (

      <li key={location.place_id}>
        <div className="search-item">
          <button onClick={this.handleRequireMarker} className="listings" id={location.place_id} value={location}><FontAwesomeIcon icon={faMapMarkerAlt} className="marker-icon-list"/>{location.formatted_address}</button>
        </div>               
      </li>
      
    );
  }

}

export default SearchItem
