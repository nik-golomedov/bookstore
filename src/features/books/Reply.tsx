import React from "react";
import { Link } from "react-scroll";
import Time from "../../common/Time";
import { StyledReview } from "../../styledComponents/styled";
import { TargetUserI } from "./Book";
import { ReplyI } from "./bookSlice";

interface ReplyPropsI {
  reply: ReplyI;
  handleClick: (value?: TargetUserI | null) => void;
  userId: number | null;
}

const Reply: React.FC<ReplyPropsI> = ({ reply, handleClick, userId }) => {
  return (
    <>
      <StyledReview reply>
        <div>
          <div>От: {reply.user && reply.user.fullName}</div>
          <div className="review-time">
            <Time createTime={reply.createdAt!} />
          </div>
        </div>
        <div>{reply.text}</div>
        <Link
          to="review"
          activeClass="active"
          offset={-200}
          spy={true}
          smooth={true}
        >
          {/* <span
            className="review-footer"
            // onClick={() => {
            //   handleClick(
            //     reply.user && {
            //       id: userId === reply.user.id ? null : reply.user.id,
            //       fullName: userId === reply.user.id ? null : reply.user.fullName,
            //       reviewId: +reply.reviewId!,
            //     }
            //   );
            // }}
          >
            Ответить
          </span> */}
        </Link>
      </StyledReview>
    </>
  );
};

export default Reply;
