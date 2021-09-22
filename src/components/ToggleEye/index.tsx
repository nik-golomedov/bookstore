import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ToggleEyePropsI {
  toggleEye: boolean;
  handleClick: () => void;
}

const ToggleEye: React.FC<ToggleEyePropsI> = ({
  handleClick,
  toggleEye,
}: ToggleEyePropsI) => (
  <>
    {!toggleEye ? (
      <AiFillEye onClick={handleClick} />
    ) : (
      <AiFillEyeInvisible onClick={handleClick} />
    )}
  </>
);

export default ToggleEye;
