import React from "react";
import "./CounterItem.css";
import { FormattedMessage } from "react-intl";

const CounterItem = props => {
  return (
    <div className="CounterItem">
      <div className="CounterItem-value">{props.value}</div>
      <div className="CounterItem-desc">
        {
          <FormattedMessage
            id={`CounterItem.${props.desc}`}
            values={{ count: props.value }}
          />
        }
      </div>
    </div>
  );
};

export default CounterItem;
