import React, { Component } from 'react';
import '../App.css';

class SearchContainer extends Component {

  handleSearch = e =>{
    e.preventDefault();
    this.props.onSearch(e.target.value);
  } 

  render() {
    const {locations} = this.props;
    locations===undefined? console.log('') : console.log(locations);
    return (

      <div className="search-places">
        <div className="search-places-bar">
              <div className="search-places-input-wrapper">
                <input
                  type="text"
                  onChange={this.handleSearch}
                  placeholder="Search by area or adress"
                />
                 

              </div>
              
        </div>
        <div className="locations-list-container">
                <ol className="locations-list">

                      {locations===undefined? '': locations.map(location => (
                        <li key={location.place_id}>
                          <p>{location.formatted_address}</p>
                        </li>
                      ))}                  
                </ol>
              </div>
              
      </div>
    );
  }

}

export default SearchContainer
