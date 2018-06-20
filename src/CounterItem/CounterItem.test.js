import React from "react";
import { shallow } from "enzyme";
import CounterItem, { CounterItemValue } from "./CounterItem";
import { FormattedMessage } from "react-intl";

describe("Component CounterItem", () => {
  let el = undefined;
  let props = undefined;
  const setup = () => {
    if (!el) {
      el = shallow(<CounterItem {...props} />);
    }
    return el;
  };

  beforeEach(() => {
    el = undefined;
    props = {
      value: "1",
      desc: "minutes"
    };
  });

  describe("should render", () => {
    it("provided value", () => {
      expect(
        setup()
          .find(CounterItemValue)
          .dive()
          .text()
      ).toEqual(props.value);
    });

    it("correct localization message", () => {
      expect(
        setup()
          .find(FormattedMessage)
          .prop("id")
      ).toEqual(`CounterItem.${props.desc}`);
    });
  });
});
