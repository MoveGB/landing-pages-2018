import React, { Component } from 'react';
import ContentImage from './ContentImage';
import './Passport.css';

export default class Passport extends Component {

  render() {
    const logos = this.props.passport.partnerLogos.map((logo) =>
      <ContentImage key={logo.handle} handle={logo.handle} transform="resize=h:100,w:100,f:crop" className="logo" />
    )
    if (this.props.mostExpensive === false) {
      return (
        <article className="Passport">
        <div className="Banner Popular"><div>MOST POPULAR</div>Your 10 Days FREE Trial</div>
        <div className="Price">
        <h1>
        <span>then</span>
        <strong>&pound;{this.props.passport.price}</strong>
        <span>per week*</span>
        </h1>
        </div>
        <div className="PriceInfo">
        <p><strong>CANCEL AT ANY TIME</strong></p>
        <div>Instant access to hundreds of venues in {this.props.city}</div>
        <small>* billed every 4 weeks</small>
        </div>
        </article>
      )
    } else {
      return (
        <article className="Passport">
        <div className="Banner"></div>
        <div className="Price">
        <h1>
        <span>then</span>
        <strong>&pound;{this.props.passport.price}</strong>
        <span>per week*</span>
        </h1>
        </div>
        <div className="PriceInfo">
        <p><strong>CANCEL AT ANY TIME</strong></p>
        <div>Instant access to hundreds of venues in {this.props.city}, plus additional VIP activities</div>
        <small>* billed every 4 weeks</small>
        </div>
        </article>
      )
    }
  }
}
