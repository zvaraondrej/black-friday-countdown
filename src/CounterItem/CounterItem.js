import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const CounterItemWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #000000;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export const CounterItemValue = styled.div`
  font-size: 60px;
  padding: 8px 0px;
`;

const CounterItemDesc = styled.div`
  text-transform: uppercase;
`;

const CounterItem = props => {
  return (
    <CounterItemWrapper>
      <CounterItemValue>{props.value}</CounterItemValue>
      <CounterItemDesc>
        {
          <FormattedMessage
            id={`CounterItem.${props.desc}`}
            values={{ count: props.value }}
          />
        }
      </CounterItemDesc>
    </CounterItemWrapper>
  );
};

CounterItem.propTypes = {
  desc: PropTypes.string,
  value: PropTypes.string
};

CounterItem.defaultProps = {
  desc: "",
  value: ""
};

export default CounterItem;
