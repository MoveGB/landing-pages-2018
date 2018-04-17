import React, { Component } from 'react';
import './ActivityChoice.css';
import Icon from '../Icon';

function mapActivityToSvg(activityName) {
    return activityName.replace(' ', '_');
}

export default class ActivityChoice extends Component {
  constructor(props) {
    super(props);

    var defaultFeaturedActivities = [
      "Climbing",
      "Water_Sports",
      "Crossfit",
      "Dance",
      "Cycling",
      "Fitness_Class",
      "Gym",
      "Martial_Arts",
      "Mind_Body",
      "Racquet_Sports",
      // "Strength",
      "Yoga",
      "Swimming",
      "Gymnastics",
    ];

    this.state = {
      activities: props.activities,
      highlightClass: '',
      featuredActivities: props.featuredActivities || defaultFeaturedActivities
    };

    this.choose = this.choose.bind(this);
    this.confirmChoice = this.confirmChoice.bind(this);
    this.clear = this.clear.bind(this);
  }

  choose(activity) {
    this.setState({highlightClass: ''});
    if (this.state.activities.lastIndexOf(activity) === -1) {
      this.setState({activities: this.state.activities.concat([activity]).reverse().slice(0,2).reverse()});
    } else {
      this.setState({activities: this.state.activities.filter(a => a !== activity)});
    }
    this.setState({highlightClass: 'highlight'});
  }

  confirmChoice() {
    this.props.onChoice(this.state.activities);
  }

  clear() {
    this.setState({activities: []});
  }

  render() {
    return (
      <div className="ActivityChoice">
        <div className="inner">
          <h3>Select <strong>one</strong> or <strong>two</strong> activities</h3>
          <ul>
            <AnyActivityButton activity="Any_Activity" activities={this.state.activities} onChoose={this.clear} />
          {this.state.featuredActivities.map((activity) =>
            <ActivityButton key={activity} activity={activity} activities={this.state.activities} onChoose={this.choose} />
          )}
          </ul>
          <div className="action">
            <button onClick={(e) => this.confirmChoice()} className={`beacon ${this.state.highlightClass}`} id="activities-choice-done">Done</button>
          </div>
        </div>
      </div>
    );
  }
}

class ActivityButton extends Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }

  handelClick() {
    this.props.onChoose(this.props.activity);
  }

  selected() {
    return this.props.activities.lastIndexOf(this.props.activity) !== -1;
  }

  className() {
    return (this.selected() ? 'selected' : null);
  }

  render() {
    return (
      <span className={this.className()} onClick={this.handelClick}>
      <li className={`beacon ${this.props.activity}`}>
        <button className={`beacon ${this.props.activity}`}><Icon name={mapActivityToSvg(this.props.activity)} />
        </button>
      </li>
      <span>{this.props.activity.replace('_', ' ')}</span>
      </span>
    );
  }
}

class AnyActivityButton extends ActivityButton {
  selected() {
    return this.props.activities.length === 0;
  }
  render() {
    return (
      <li className={this.className()} onClick={this.handelClick}>
        <button>
          <Icon className="any"  name="any" />
        </button>
      </li>
    );
  }
}
