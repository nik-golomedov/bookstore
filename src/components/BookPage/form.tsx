import React from "react";
import { useFormik } from "formik";

import { useAppDispatch } from "../../store";
import { addReview } from "../../store/bookSlice";
import { AddReviewI, TargetUserI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

interface ReviewFormPropsI {
    id: number
    userId:number
    // eslint-disable-next-line react/require-default-props
    targetUser?: TargetUserI | null
    cancelTargetUser: () => void
    handleShowReview: () => void
}

const ReviewForm:React.FC<ReviewFormPropsI> = ({
  id, userId, targetUser, cancelTargetUser, handleShowReview,
}) => {
  const dispatch = useAppDispatch();

  const {
    resetForm, handleChange, handleSubmit, values,
  } = useFormik({
    initialValues: {
      text: "",
      bookId: +id,
      userId,
      createdAt: "",
    } as AddReviewI,
    onSubmit: (value: AddReviewI) => {
      if (!targetUser?.id) {
        dispatch(
          addReview({
            ...value,
            bookId: +id,
            userId,
          }),
        );
      } else {
        dispatch(
          addReview({
            text: values.text,
            reviewId: targetUser.reviewId!,
            targetUserId: +targetUser.id,
            bookId: +id,
          }),
        );
      }
      handleShowReview();
      resetForm();
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit} id="review">
      <b>Оставить отзыв:</b>
      <span>
        {targetUser?.id && (
        <span>
          {targetUser?.id ? (
            <span>
              Ответ на комментарий
              {" "}
              {targetUser?.fullName}
            </span>
          ) : null}
          <span
            role="button"
            tabIndex={0}
            onClick={cancelTargetUser}
          >
            <div className="cancel-targetuser">Отмена</div>
          </span>
        </span>
        )}
      </span>
      <textarea
        id="text"
        name="text"
        onChange={handleChange}
        value={values.text}
      />
      <StyledButton type="submit">Отправить</StyledButton>
    </StyledForm>
  );
};

export default ReviewForm;
