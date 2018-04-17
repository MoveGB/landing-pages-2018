import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    return (
      <svg className={this.props.className} alt={this.props.alt} >
        <use xlinkHref={`#src--sprites--${this.props.name}`} />
      </svg>
    );
  }
}
