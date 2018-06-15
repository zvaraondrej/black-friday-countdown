import moment from "moment";
import React, { Component } from "react";
import "./Counter.css";
import CounterItem from "./../../components/CounterItem/CounterItem";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      }
    };
  }

  componentDidMount() {
    const blackFriday = this.resolveBlackFridayDate(moment().year());
    setInterval(() => {
      const duration = moment.duration(blackFriday.diff(moment()));
      this.setState({
        countdown: {
          days: Math.trunc(duration.asDays()),
          hours: ("0" + duration.hours()).slice(-2),
          minutes: ("0" + duration.minutes()).slice(-2),
          seconds: ("0" + duration.seconds()).slice(-2)
        }
      });
    }, 1000);
  }

  resolveBlackFridayDate(year) {
    // BF is always after Thanksgiving
    // TG is always fourth Wednesday in November
    const wednesdayIndex = 4;

    const november = moment([year, 10]);
    const firstDayIndex = november.isoWeekday();

    let firstWednesday = undefined;
    if (firstDayIndex <= wednesdayIndex) {
      firstWednesday = november.isoWeekday(wednesdayIndex);
    } else {
      firstWednesday = november.add(1, "weeks").isoWeekday(wednesdayIndex);
    }

    return firstWednesday.add(3, "w").add(1, "d");
  }

  render() {
    const { countdown } = this.state;

    return (
      <div className="Counter">
        <header className="Counter-header">
          <p>To get started</p>
        </header>
        <main className="Counter-items">
          {Object.keys(countdown).map(key => {
            return <CounterItem value={countdown[key]} desc={key} />;
          })}
        </main>
      </div>
    );
  }
}

export default Counter;
