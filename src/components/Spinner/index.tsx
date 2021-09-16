import React from "react";

import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

const Spinner: React.FC = () => (
  <div className="sweet-loading">
    <CircleLoader color="#26a9e0" loading css={override} size={120} />
  </div>
);

export default Spinner;
