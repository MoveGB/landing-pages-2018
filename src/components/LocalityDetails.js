import React, { Component } from 'react';
import Passport from './Passport';
import ContentImage from './ContentImage';
import Venues from './Venues';
import Icon from '../Icon';
import './LocalityDetails.css';

// don't displlay prices below the default trial
const cityMinPrice = {
  Bath: 13.99,
  Brighton: 15.99,
  Bristol: 13.99,
  Hove: 15.99,
  London: 26.99,
  Manchester: 10.99,
  Plymouth: 9.49,
  Sheffield: 9.49
}

const signUpFlowURL = '/trial-2';

export default class LocalityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'featured',
      venues: [],
    };
    this.showPartner = this.showPartner.bind(this);
    this.hidePartner = this.hidePartner.bind(this);
    this.showFeatured = this.showFeatured.bind(this);
    this.showVenues = this.showVenues.bind(this);
  }

  showPartner(partner) {
    this.setState({viewPartner: partner});
    document.body.className = 'modal-open';
  }

  hidePartner() {
    this.setState({viewPartner: null});
    document.body.className = '';
  }

  showFeatured() {
    this.setState({show: 'featured'});
  }

  showPricing() {
    if (this.state.show === 'pricing') {
      document.location.href = signUpFlowURL;
    } else {
      this.setState({show: 'pricing', viewPartner: null});
    }
  }

  showVenues() {
    this.props.api.getVenuesForLocality(this.props.locality).then((venues) =>
      this.setState({
        venues: venues,
        show: 'venues',
      })
    );
  }

  render() {
    const cityKey = Object.keys(cityMinPrice).filter(key => this.props.locality.moveCity.includes(key))[0] || 0;
    const highestPrice = this.props.locality.passports[this.props.locality.passports.length - 1].price; 
    const passports = this.props.locality.passports.filter(passport => passport.price >= cityMinPrice[cityKey]).map(passport =>
      <Passport key={passport.price} passport={passport} city={this.props.locality.moveCity} mostExpensive={passport.price === highestPrice}/>
    );
    window.scrollTo(0, 0);
    return (
      <div className="LocalityDetails">
        <h2>{this.props.locality.availabilityDescription}</h2>
      <div className="menu">
        <a onClick={(e) => this.setState({show: 'featured'})} className={this.state.show === 'featured' ? 'selected' : null} >Featured</a>
        <a onClick={this.showPricing.bind(this)} className={this.state.show === 'pricing' ? 'selected' : null} >Pricing</a>
      </div>
      {

        this.state.show === 'featured'
        ? <Featured partners={this.props.featured} handleClick={this.showPartner} />
        : null
      }
      {
        this.state.show === 'pricing'
        ? <section className="Passports">{passports}</section>
        : null
      }
      {
        this.state.show === 'venues'
          ? <Venues locality={this.props.locality} venues={this.state.venues} onClose={this.showFeatured} />
        : null
      }
      {
        this.state.viewPartner
        ? <ViewPartner onClose={this.hidePartner} partner={this.state.viewPartner} />
        : null
      }

        <a onClick={this.showVenues} className="venuesLink">Have a venue in mind?</a>
      {
        this.state.show !== ''
        ? <a onClick={this.showPricing.bind(this)} className="cta beacon" id="what-where-cta"><div>Continue</div></a>
        : null
      }
      </div>
    )
  }
}

class Featured extends Component {
  render() {
    const items = this.props.partners.map(partner =>
      <article key={partner.id} className="item" onClick={(e) => this.props.handleClick(partner)}>
        <div className="images">
          <ContentImage handle={partner.image.handle} transform="resize=height:320" alt={partner.name} className="image" />
        </div>
        <h1>{partner.name}</h1>
        <h2>{partner.shortAddress}</h2>
        <Rating stars={partner.rating} />
      </article>
    );
    return (
      <section className="Featured">
        {items}
      </section>
    );
  }
}

class Rating extends Component {
  star(star, total) {
    let type = 'empty';
    if (total >= star) {
      type = 'full';
    }
    if (total < star && total > star - 1) {
      type = 'half';
    }
    return (
      <Icon key={star} name={`star-rating-${type}`} className="ratingStar" />
    )
  }
  render() {
    if (this.props.stars === 0) {
      return null;
    } else {
      const stars =  [1,2,3,4,5].map((i) =>
        this.star(i, this.props.stars)
      );
      return (
        <div className="ratingStars">{stars}</div>
      )
    }
  }
}

class ViewPartner extends Component {
  render() {
    const partner = this.props.partner;
    const reviews = this.props.partner.reviews.map((review) =>
      <article className="review">
        <div className="avatar">

        </div>
        <div className="content">
          <h3>{review.customerName}</h3>
          <Rating stars={review.rating} />
          <p>{review.content}</p>
        </div>
      </article>
    );
    return (
      <article className="ViewPartner" onClick={this.props.onClose}>
        <a className="close"><Icon name="navigation-close" /></a>
        <div className="inner">
          <div className="images">
            <ContentImage handle={partner.image.handle} transform="resize=height:320" alt={partner.name} className="image" />
          </div>
          <div className="details">
            <h1>{partner.name}</h1>
            <address>{partner.shortAddress}</address>
            <Rating stars={partner.rating} />
            <div dangerouslySetInnerHTML={{__html: partner.description}} className="content"></div>
            <h2>Top Reviews</h2>
            {reviews}
          </div>
        </div>
      </article>
    );
  }
}

