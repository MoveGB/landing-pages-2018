import React, { Component } from 'react';

export default class ContentImage extends Component {
  render() {
    const url = "https://media.graphcms.com/" + this.props.transform + "/" + this.props.handle;
    return (
      <img src={url} alt={this.props.alt} className={this.props.className} />
    )
  }
}

