import React from "react";
import { Link } from "react-scroll";

import Time from "../../../Time";

import { ReviewI } from "../../../../../interfaces";
import StyledReview from "./styles";

interface ReplyPropsI {
  reply: ReviewI;
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
