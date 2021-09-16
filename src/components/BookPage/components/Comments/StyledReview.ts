import styled from "styled-components";

interface StyledReviewPropsI {
  reply?: boolean;
}

const StyledReview = styled.div<StyledReviewPropsI>`
  width: ${(props) => (props.reply ? "90%" : "100%")};
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-flow: column;
  padding: 24px 24px 12px 24px;
  margin: ${(props) => (props.reply ? "20px 0 0 140px" : "20px 0")};
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  white-space: pre-line;
  word-break: break-all;

  b {
    padding: 0;
    margin: 0;
  }
  & * {
    margin: 0 10px 4px 0px;
  }
  & > div:first-of-type {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .review-time {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
  }
  .review-footer {
    color: #26a9e0;
    cursor: pointer;
    margin: 10px 0 0 130px;
    text-align: start;
  }
`;

export default StyledReview;
