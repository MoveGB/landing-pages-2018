import React, { Component } from 'react';
import './Venues.css';
import Icon from '../Icon';

export default class Venues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'list',
    };
    this.showMap = this.showMap.bind(this);
    this.mapConfig = {
      geo  : [
        51.459999,
        -2.587000
      ],
      zoom : 11,
      access_token: 'pk\u002eeyJ1IjoibW92ZWdiIiwiYSI6IjdTYkF3UE0ifQ\u002eFPrNupsPcU\u002dNaP88p\u005fdEAw',
    };
  }

  showMap() {
    // this.setState({show: 'map'}, (s) => window.createMap(this.mapConfig));
  }

  render() {
    return (
      <div className="Venues">
        <div className="inner">
        <div className="VenueSearch">
      <a className="close" onClick={this.props.onClose}><Icon name="navigation-close" /></a>
        <h2>Check if your favourite venue is on the Move network. Not all venues are available on your trial but you can upgrade anytime</h2>
        </div>
        <div className="Space"></div>
      {

        this.state.show === 'list'
        ? <VenueList venues={this.props.venues} />
        : null
      }
      {
        this.state.show === 'map'
        ? <div id="venue-map"></div>
        : null
      }
      </div>
      </div>
    )
  }
}

class VenueList extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  filteredVenues() {
    if (this.state.query) {
      return this.props.venues.filter((v) => v.business_name.toUpperCase().includes(this.state.query.trim().toUpperCase()));
    } else {
      return this.props.venues;
    }
  }


  render() {
    const venues = this.filteredVenues().map((venue) =>
      <li><a>{venue.business_name}</a></li>
    );
    return (
      <div className="VenueList">
      <div className="SearchBox">
      <input className="search" type="text" placeholder="Search for a venue" value={this.state.query} autoFocus onChange={this.handleChange} />
      </div>
      <ul>{venues}</ul>
      </div>
    )
  }
}

