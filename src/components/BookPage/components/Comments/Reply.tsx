import React from "react";

import { Link } from "react-scroll";

import { ReplyI } from "../../../../interfaces";
import Time from "../../../Time";
import StyledReview from "./StyledReview";

interface ReplyPropsI {
  reply: ReplyI;
}

const Reply: React.FC<ReplyPropsI> = ({ reply }) => (
  <StyledReview reply>
    <div>
      <div>
        От:
        {reply.user && reply.user.fullName}
      </div>
      <div className="review-time">
        <Time createTime={reply.createdAt!} />
      </div>
    </div>
    <div>{reply.text}</div>
    <Link
      to="review"
      activeClass="active"
      offset={-200}
      spy
      smooth
    />
  </StyledReview>
);

export default Reply;
