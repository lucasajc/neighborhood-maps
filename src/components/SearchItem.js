import React, { Component } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * @description renders the SearchItem component
 */
class SearchItem extends Component {

  /**
   * @description requests the marker to focus on it on the map
   * @param {e} object - The onclick event
   */
  handleRequireMarker = e => {
    e.preventDefault();
    if (this.props.onRequireMarker)
      this.props.onRequireMarker(e.currentTarget.id);
  };

  /**
   * @description renders the component
   * @returns jsx containing the component/routes
   */
  render() {
    const { location } = this.props;
    return (
      <li key={location.id}>
        <main className="search-item">
          <button
            onClick={this.handleRequireMarker.bind(this)}
            className="listings"
            id={location.title}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="marker-icon-list"
            />
            {location.title}
          </button>
        </main>
      </li>
    );
  }
}

export default SearchItem;
