import React, { Component } from 'react';
import './LocalityChoice.css';
import Icon from '../Icon';


export default class LocalityChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {query: '', filteredLocalities: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleQueryKeyPress = this.handleQueryKeyPress.bind(this);
    this.choose = this.choose.bind(this);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
      filteredLocalities: this.filteredLocalities(event.target.value),
    });
  }

  handleQueryKeyPress(event) {
    if(event.key === 'Enter') {
      this.choose(this.state.filteredLocalities[0])
    }
  }

  choose(locality) {
    this.props.onChoice(locality);
  }

  filteredLocalities(query) {
    if (query) {
      return this.props.localities.filter((l) => l.name.toUpperCase().includes(query.trim().toUpperCase()));
    } else {
      return [];
    }
  }

  render() {
    window.scrollTo(0, 0);
    return (
      <div className="LocalityChoice">
        <div className="inner">
      <a className="close" onClick={this.props.onCancel}><Icon name="navigation-close" /></a>
      <input className="search" placeholder="Try 'Bath'" value={this.state.query} autoFocus onChange={this.handleChange} onKeyPress={this.handleQueryKeyPress} />
        <ul>
            {this.state.filteredLocalities.map((locality) =>
              <li key={locality.name}>
                <button className="beacon" onClick={this.choose.bind(this, locality)}>{locality.name}</button>
              </li>
            )}
            { this.state.query.length > 0 && this.state.filteredLocalities.length === 0
                ? <li><a className="beacon" href="#map-list" id="locality-not-found" onClick={this.props.onCancel}>View on Map</a></li>
                : null }
        </ul>
      </div>
      </div>
    );
  }
}
