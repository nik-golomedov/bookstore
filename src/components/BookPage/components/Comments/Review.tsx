import React, { useState } from "react";

import { Link } from "react-scroll";
import styled from "styled-components";

import { ReviewI, TargetUserI } from "../../../../interfaces";
import Time from "../../../Time";
import Reply from "./Reply";
import StyledReview from "./StyledReview";

interface ReviewPropsI {
  review: ReviewI[];
  // eslint-disable-next-line no-unused-vars
  handleClick: (value: TargetUserI | null) => void;
}

const Review: React.FC<ReviewPropsI> = ({
  review,
  handleClick,
}: ReviewPropsI) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleShowReplyClick = (index: number) => {
    setEditIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {review.map((item, index) => (
        <React.Fragment key={item.id}>
          <StyledReview key={item.id}>
            <div>
              <div>
                От:
                {item.user && item.user.fullName}
                {item.targetUserName && (
                <>
                  Кому:
                  {item.targetUserName}
                </>
                )}
              </div>
              <div className="review-time">
                <Time createTime={item.createdAt} />
              </div>
            </div>
            <div>{item.text}</div>
            {item?.user?.id && (
              <Link
                to="review"
                activeClass="active"
                offset={-200}
                spy
                smooth
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="review-footer"
                  onClick={() => {
                    handleClick({
                      id: item?.user?.id,
                      fullName: item?.user?.fullName,
                      reviewId: +item.id!,
                    });
                  }}
                >
                  Ответить
                </div>
              </Link>
            )}
          </StyledReview>
          {item.replies?.length !== 0 && (
            <StyledShowReply onClick={() => handleShowReplyClick(index)}>
              {editIndex !== index ? (
                <span>
                  Показать ответы (
                  {item.replies?.length}
                  )
                </span>
              ) : (
                <span>Скрыть ответы</span>
              )}
            </StyledShowReply>
          )}

          {editIndex === index
            && item?.replies
              ?.slice()
              .sort((a, b) => a?.createdAt!.localeCompare(b?.createdAt!))
              .map((reply) => (
                <Reply reply={reply} key={reply.id} />
              ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Review;

const StyledShowReply = styled.div`
  color: #247fa7;
  cursor: pointer;
  margin: 0 0 40px 30px;
`;
