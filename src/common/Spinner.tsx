import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

const Spinner: React.FC = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#26a9e0");

  return (
    <div className="sweet-loading">
      <CircleLoader color={color} loading={loading} css={override} size={120} />
    </div>
  );
};

export default Spinner;
