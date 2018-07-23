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
      this.props.onRequireMarker(e.currentTarget.id);
  };

  render() {
    const {location} = this.props;
    
    return (

      <li key={location.title}>
        <div className="search-item">
          <button onClick={this.handleRequireMarker.bind(this)} className="listings" id={location.title}><FontAwesomeIcon icon={faMapMarkerAlt} className="marker-icon-list"/>{location.title}</button>
        </div>               
      </li>
      
    );
  }

}

export default SearchItem
