import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IntlProvider, addLocaleData } from "react-intl";

import CounterItem from "./../../components/CounterItem/CounterItem";

import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";

import translationsEN from "./../../lang/locale-en.json";
import translationsDE from "./../../lang/locale-de.json";

const translations = {
  "en-US": translationsEN,
  "de-AT": translationsDE
};

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CounterHeader = styled.header`
  font-size: large;
`;

const CounterHeaderText = styled.p`
  margin: 0;
`;

const CounterItemsWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class Counter extends Component {
  constructor(props) {
    super(props);
    addLocaleData([...en, ...de]);

    // TODO
    // to enable months, uncomment line 29 & line 50
    this.state = {
      countdown: {
        // months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      }
    };
  }

  componentDidMount() {
    const blackFriday = this.resolveBlackFridayDate(moment().year());
    this.updateTimer(blackFriday);
    setInterval(() => {
      this.updateTimer(blackFriday);
    }, 1000);
  }

  updateTimer(blackFriday) {
    const duration = moment.duration(blackFriday.diff(moment()));
    this.setState({
      countdown: {
        // months: Math.trunc(duration.asMonths()),
        days: Math.trunc(duration.asDays()),
        hours: ("0" + duration.hours()).slice(-2),
        minutes: ("0" + duration.minutes()).slice(-2),
        seconds: ("0" + duration.seconds()).slice(-2)
      }
    });
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
    const { langId } = this.props;

    return (
      <IntlProvider locale={langId} messages={translations[langId]}>
        <CounterWrapper>
          <CounterHeader>
            <CounterHeaderText>To get started</CounterHeaderText>
          </CounterHeader>
          <CounterItemsWrapper>
            {Object.keys(countdown).map(key => {
              return (
                <CounterItem key={key} value={countdown[key]} desc={key} />
              );
            })}
          </CounterItemsWrapper>
        </CounterWrapper>
      </IntlProvider>
    );
  }
}

Counter.propTypes = {
  langId: PropTypes.string
};

Counter.defaultProps = {
  langId: "en-US"
};

export default Counter;
