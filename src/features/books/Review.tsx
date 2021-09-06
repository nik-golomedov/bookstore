import React from "react";
import Time from "../../common/Time";
import { StyledReview } from "../../styledComponents/styled";
import { ReviewI } from "./bookSlice";

interface ReviewPropsI {
  review: ReviewI[];
}

const Review: React.FC<ReviewPropsI> = ({ review }: ReviewPropsI) => {
  return (
    <>
      {review
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((item) => (
          <StyledReview key={item.id}>
            <div>
              <div>{item.user && item.user.fullName}</div>
              <div>
                <Time createTime={item.createdAt} />
              </div>
            </div>
            <div>
              <b>Комментарий:</b>
              {item.text}
            </div>
          </StyledReview>
        ))}
    </>
  );
};

export default Review;
