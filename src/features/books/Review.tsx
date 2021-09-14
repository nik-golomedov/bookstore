import React, { useState } from "react";
import { Link } from "react-scroll";

import Time from "../../common/Time";
import { StyledReview, StyledShowReply } from "../../styledComponents/styled";
import { TargetUserI } from "./Book";
import { ReviewI } from "./bookSlice";
import Reply from "./Reply";

interface ReviewPropsI {
  review: ReviewI[];
  handleClick: (value?: TargetUserI | null) => void;
  userId: number | null;
}

const Review: React.FC<ReviewPropsI> = ({
  review,
  handleClick,
  userId,
}: ReviewPropsI) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleShowReplyClick = (index: number) => {
    setEditIndex((editIndex) => (editIndex === index ? null : index));
  };

  return (
    <>
      {review.map((item, index) => (
        <React.Fragment key={item.id}>
          <StyledReview key={item.id}>
            <div>
              <div>
                От: {item.user && item.user.fullName}
                {item.targetUserName && <> Кому: {item.targetUserName}</>}
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
                spy={true}
                smooth={true}
              >
                <div
                  className="review-footer"
                  onClick={() => {
                    handleClick(
                      item.user && {
                        id: item.user.id,
                        fullName: item.user.fullName,
                        reviewId: +item.id!,
                      }
                    );
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
                <span>Показать ответы ({item.replies?.length})</span>
              ) : (
                <span>Скрыть ответы</span>
              )}
            </StyledShowReply>
          )}

          {editIndex === index &&
            item?.replies
              ?.slice()
              .sort((a, b) => b?.createdAt!.localeCompare(a?.createdAt!))
              .map((reply) => (
                <Reply
                  reply={reply}
                  key={reply.id}
                  handleClick={handleClick}
                  userId={userId}
                />
              ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Review;
