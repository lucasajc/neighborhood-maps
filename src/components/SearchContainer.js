import React, { Component } from "react";
import "../App.css";
import SearchItem from "./SearchItem";

/**
 * @description renders the SearchContainer component
 */
class SearchContainer extends Component {

   /**
   * @description send query to filter locations
   * @param {e} object - The onchange event
   */ 
  handleSearch = e => {
    e.preventDefault();
    this.props.onSearch(e.target.value);
  };

  /**
   * @description renders the component
   * @returns jsx containing the component/routes
   */
  render() {
    const { locations } = this.props;

    return (
      <main className="search-places">
        <header className="search-places-bar ">
          <nav className="search-places-input-wrapper">
            <input
              type="text"
              onChange={this.handleSearch}
              placeholder="Filter by place title or type"
            />
          </nav>
        </header>
        <nav className="locations-list-container">
          <ul className="locations-list">
            {locations === undefined
              ? ""
              : locations.map(
                  location =>
                    location.marker === undefined ? (
                      ""
                    ) : location.marker.visible === true ? (
                      <SearchItem
                        location={location}
                        onRequireMarker={this.props.onRequireMarker}
                        key={location.id}
                      />
                    ) : (
                      ""
                    )
                )}
          </ul>
        </nav>
      </main>
    );
  }
}

export default SearchContainer;
