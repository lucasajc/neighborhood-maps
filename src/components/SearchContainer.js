import React, { Component } from 'react';
import '../App.css';
import SearchItem from "./SearchItem";

class SearchContainer extends Component {

  handleSearch = e =>{
    e.preventDefault();
    this.props.onSearch(e.target.value);
  } 

  render() {
    const {locations} = this.props;
    //locations===undefined? console.log('') : console.log(locations);
    return (

      <div className="search-places">
        <div className="search-places-bar">
              <div className="search-places-input-wrapper">
                <input
                  type="text"
                  onChange={this.handleSearch}
                  placeholder="Filter by place title"
                />
                 

              </div>
              
        </div>
        <div className="locations-list-container">
                <ul className="locations-list">

                      {locations===undefined? '': locations.map(location => (
                        <SearchItem
                          location={location}
                          onRequireMarker={this.props.onRequireMarker}
                        />
                      ))}                  
                </ul>
              </div>
              
      </div>
    );
  }

}

export default SearchContainer
