import moment from "moment";
import React, { Component } from "react";
import styled from "styled-components";

import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";

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

const CounterSection = styled.header`
  width: 100%;
  font-size: large;
  text-transform: uppercase;
`;

const CounterSectionText = styled.p`
  margin: 0 10px;
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

    // to enable months, uncomment line 29 & line 50
    this.state = {
      countdown: {
        // months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      },
      langId: Object.keys(translations)[0]
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
        // months: Math.trunc(duration.asMonths()).toString(),
        days: Math.trunc(duration.asDays()).toString(),
        hours: ("0" + duration.hours()).slice(-2),
        minutes: ("0" + duration.minutes()).slice(-2),
        seconds: ("0" + duration.seconds()).slice(-2)
      }
    });
  }

  resolveBlackFridayDate(year) {
    // BF is always after ThanksGiving
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

  setLangId = langId => {
    this.setState({ langId });
  };

  render() {
    const { countdown, langId } = this.state;
    const translationsArr = Object.keys(translations);

    return (
      <IntlProvider locale={langId} messages={translations[langId]}>
        <CounterWrapper>
          <CounterSection>
            <CounterSectionText>
              <FormattedMessage id="CounterHeader.message" />
            </CounterSectionText>
          </CounterSection>
          <CounterItemsWrapper>
            {Object.keys(countdown).map(key => {
              return (
                <CounterItem key={key} value={countdown[key]} desc={key} />
              );
            })}
          </CounterItemsWrapper>
          <CounterSection>
            <CounterSectionText>
              {translationsArr.map((key, index) => {
                return (
                  <button key={key} onClick={() => this.setLangId(key)}>
                    <span>{key}</span>
                    {index !== translationsArr.length - 1 && <span> | </span>}
                  </button>
                );
              })}
            </CounterSectionText>
          </CounterSection>
        </CounterWrapper>
      </IntlProvider>
    );
  }
}

export default Counter;
