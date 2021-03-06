import React, { useState } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

import Time from "../../../Time";
import Reply from "./Reply";

import { ReviewI, TargetUserI } from "../../../../../interfaces";
import StyledReview from "./styles";

interface ReviewPropsI {
  review: ReviewI[];
  // eslint-disable-next-line no-unused-vars
  handleClick: (value: TargetUserI | null) => void;
}

const Review: React.FC<ReviewPropsI> = ({
  review,
  handleClick,
}: ReviewPropsI) => {
  const [editIndex, setEditIndex] = useState<number[]>([]);

  const handleShowReplyClick = (index: number) => {
    setEditIndex((prev) => (prev?.includes(index)
      ? prev.filter((item) => item !== index)
      : [...prev, index]));
  };

  return (
    <>
      {review.map((item, index) => (
        <React.Fragment key={item.id}>
          <StyledReview key={item.id}>
            <div>
              <div>
                <span>От: </span>
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
              <Link to="review" activeClass="active" offset={-200} spy smooth>
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
          {!!item.reviews?.length && (
            <StyledShowReply onClick={() => handleShowReplyClick(index)}>
              {!editIndex?.includes(index) ? (
                <span>
                  Показать ответы (
                  {item.reviews?.length}
                  )
                </span>
              ) : (
                <span>Скрыть ответы</span>
              )}
            </StyledShowReply>
          )}

          {editIndex?.includes(index)
            && item?.reviews
              ?.slice()
              .sort((a, b) => a?.createdAt!.localeCompare(b?.createdAt!))
              .map((reply) => <Reply reply={reply} key={reply.id} />)}
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
