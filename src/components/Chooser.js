
import React, { Component } from 'react';
import LocalityChoice from './LocalityChoice';
import ActivityChoice from './ActivityChoice';
import h1Img from '../img/one_membership.svg';
import LocalityDetails from './LocalityDetails';
import './Chooser.css';
import 'font-awesome/css/font-awesome.css';

export default class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      localities: []
    };
    if (this.props.startLocality) {
      this.state.locality = {name: this.props.startLocality};
    }
    if (this.props.startActivity) {
      this.state.activities.push(this.props.startActivity);
    }
    this.props.api.getLocalities().then(this.setLocalities.bind(this));
    this.chooseLocality = this.chooseLocality.bind(this);
    this.cancelChooseLocality = this.cancelChooseLocality.bind(this);
    this.changeLocality = this.changeLocality.bind(this);
    this.chooseActivities = this.chooseActivities.bind(this);
    this.cancelchooseActivities = this.cancelchooseActivities.bind(this);
    this.changeActivities = this.changeActivities.bind(this);
  }

  setLocalities(localities) {
    this.setState({localities: localities})
    if (this.props.startLocality) {
      this.changeLocality(localities.find(l => l.name === this.props.startLocality), true);
    }
  }

  changeActivities(activities) {
    this.props.api.getFeaturedPartners(this.state.locality.name, activities).then(partners => {
      this.setState({
        activities: activities,
        showActivityChoice: false,
        featured: partners,
      });
      document.body.className = '';
    });
  }

  changeLocality(locality, noActivities) {

    Promise.all([
      this.props.api.getFeaturedPartners(locality.name, this.state.activities),
      this.props.api.getFeaturedActivities(locality.name)
    ]).then((results) => {
      var partners = results[0];
      var featuredActivities = results[1].map(a => a.name);

      this.setState({
        locality: locality,
        showLocalityChoice: false,
        featured: partners,
        showLocality: true,
        featuredActivities: featuredActivities
      });
      if (noActivities) {
        document.body.className = '';
      } else {
        this.chooseActivities();
      }
    });
  }

  chooseLocality() {
    this.setState({showLocalityChoice: true, showActivityChoice: false});
    document.body.className = 'modal-open';
  }

  chooseActivities() {
    this.setState({showActivityChoice: true, showLocalityChoice: false});
    document.body.className = 'modal-open';
  }

  cancelChooseLocality() {
    this.setState({showLocalityChoice: false});
    document.body.className = '';
  }

  cancelchooseActivities() {
    this.setState({showActivityChoice: false});
    document.body.className = '';
  }

  activitiesLabel() {
    return this.state.activities.map((activity) =>
      <span key={activity}><strong className={activity}>{activity.replace('_',' ')} <i className="fa fa-caret-down"></i></strong></span>
    )
  }

  hasActivities() {
    return this.state.activities.length > 0;
  }

  question() {
    if (this.state.locality) {
      return (
        <div className="Question">
        <h1>
        I'd like to try <a onClick={this.chooseActivities}>
        {this.hasActivities() ? this.activitiesLabel() : <span><strong>Any Activity <i className="fa fa-caret-down"></i></strong></span>}
        </a>
        </h1>
        </div>
      );
    } else {
      return (
        <div className="Question">
          <header>
            <h1><img src={h1Img} alt="1 membership, 1000s of activites" /></h1>
          </header>
          <h2>Where do you want to workout?</h2>
          <input className="search beacon" id="what-where-locality" onClick={(e) => this.chooseLocality(e)} value="Try 'Bath'" readOnly/>
        </div>
      );
    }
  }

  render() {
    window.scrollTo(0, 0);
    return (
      <div className="Chooser">
      {this.question()}
      {
        this.state.showLocalityChoice && this.state.localities.length > 0
          ? <LocalityChoice onChoice={this.changeLocality} onCancel={this.cancelChooseLocality} localities={this.state.localities} />
        : null
      }
      {
        this.state.showActivityChoice
        ? <ActivityChoice onChoice={this.changeActivities} featuredActivities={this.state.featuredActivities} activities={this.state.activities} onCancel={this.cancelchooseActivities} />
        : null
      }
      {
        this.state.showLocality
        ? <LocalityDetails
            locality={this.state.locality}
            featured={this.state.featured}
            api={this.props.api}
          />
        : null
      }
      </div>
    );
  }

}
