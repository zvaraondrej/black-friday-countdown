import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import { FormattedMessage } from "react-intl";

import Counter, { CounterLangBtn } from "./Counter";
import CounterItem from "./../CounterItem/CounterItem";

describe("Component Counter", () => {
  let el = undefined;
  const setup = () => {
    if (!el) {
      el = shallow(<Counter />);
    }
    return el;
  };

  beforeEach(() => {
    el = undefined;
  });

  describe("should render", () => {
    it("a header message", () => {
      expect(setup().find(FormattedMessage).length).toBe(1);
    });

    it("4 CounterItems", () => {
      expect(setup().find(CounterItem).length).toBe(4);
    });

    it("two lang switch buttons", () => {
      expect(setup().find(CounterLangBtn).length).toBe(2);
    });
  });

  describe("on init should", () => {
    it("have set EN language by default", () => {
      expect(setup().state("langId")).toBe("en-US");
    });

    it("resolve BF date and setup timer", () => {
      jest.useFakeTimers();
      const updateTimerSpy = jest.spyOn(Counter.prototype, "updateTimer");
      setup();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(updateTimerSpy).toHaveBeenCalled();
    });
  });

  describe("should properly update timer", () => {
    it("for 2019 year", () => {
      const now = moment();
      const fakeBlackFriday = now.clone().add(1, "y");

      const inst = setup().instance();
      inst.updateTimer(fakeBlackFriday);

      expect(el.state("countdown")).toEqual({
        days: "364",
        hours: "23",
        minutes: "59",
        seconds: "59"
      });
    });
  });

  describe("should properly resolve BF date", () => {
    it("for 2018 year", () => {
      const inst = setup().instance();
      expect(inst.resolveBlackFridayDate(2018).format("DD-MM-YYYY")).toEqual(
        "23-11-2018"
      );
    });

    it("for 2019 year", () => {
      const inst = setup().instance();
      expect(inst.resolveBlackFridayDate(2019).format("DD-MM-YYYY")).toEqual(
        "29-11-2019"
      );
    });
  });
});
