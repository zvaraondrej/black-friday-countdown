import { injectGlobal } from "styled-components";

injectGlobal`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
