import styled, { keyframes } from "styled-components";

export const StyledHeader = styled.header`
  user-select: none;
  font-size: 34px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  margin: 50px 50px 3px 0;
  background-color: #26a9e0;
  padding: 40px;
  color: #eee;
  & a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: black;
  }
  & .header-logo {
    font-family: "Proza Libre", sans-serif;
    font-size: 44px;
  }

  .header-notification {
    display: flex;
    position: relative;
    svg {
      cursor: pointer;
    }
    & > .logout-btn {
      margin-left: 200px;
      cursor: pointer;
    }
  }
  & .header-nav {
    display: flex;
    align-items: center;
  }
  .notification-count {
    position: relative;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    text-align: center;
    left: -30%;
    cursor: pointer;
  }
`;

export const StyledListItem = styled.li`
  margin: 0 50px 0 0;
  cursor: pointer;
  text-decoration: none;
`;
interface StyledFormPropsI {
  readonly ai_fs?: boolean;
  smallWidth?: boolean;
}

export const StyledForm = styled.form<StyledFormPropsI>`
  display: flex;
  flex-flow:column;
  justify-content:flex-start;
  align-items: ${(props) => (props.ai_fs ? "flex-start" : "center")} ;
  width:70%;
  margin:0 auto;
  margin-bottom:20px;
  & textarea {
    resize:none;
    padding:8px;
    width:${(props) => (props.smallWidth ? "300px" : "100%")};
    height:120px;
  }
  & > * {
    font-size:14px;
    margin-top:10px;
    color:black;
  }
  & > input,select {
    width:300px;
    height:30px;
  }
  & > label {
    margin-top:15px;
    width:300px;
    height:25px;
  }
  & > div {
    font-size:14px;
    color:red;
    width:300px;
    height:25px;
  }
  & > .react-icon__eye {
    margin-top: -25px;
    margin-left: 250px;
    cursor:pointer;
  }
}
`;
export const StyledBookCard = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 240px;
  min-height: 364px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px rgb(0 0 0 / 4%);
  border-radius: 4px;
  margin: 20px 20px 20px 0;
  background-color: #ffffff;

  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  transition: 0.1s ease-in;
  cursor: pointer;
  a {
    text-decoration: none;
    padding: 20px;
  }
  .image-container {
    max-width: 134px;
    max-height: 200px;
    margin-bottom: 12px;
  }
  .image-container .image-container__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
  }
  .image-container img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    cursor: pointer;
  }
  .book-option {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 58px;
    font-size: 16px;
    line-height: 1.2;
  }
  .book-option a {
    min-height: 58px;
  }
  .book-title {
    color: #333;
  }
  .book-author {
    color: rgba(0, 0, 0, 0.55);
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .book-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    height: 40px;
  }
  .book-btn {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    background-color: #26a9e0;
    color: white;
    border-radius: 3px;
    border: none;
    padding: 0 20px;
    cursor: pointer;
    transition: 0.3s background-color;
  }
  .book-btn:hover {
    background-color: #1b75bb;
  }
  &:hover {
    box-shadow: 0 8px 20px rgb(0 0 0 / 12%), 0 0 8px rgb(0 0 0 / 4%);
  }
`;
export const StyledFullSizeBookCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  max-width: 1100px;
  margin-bottom: 100px;
  word-break: break-all;
  .book-image {
    min-width: 460px;
    max-width: 500px;
    padding-right: 60px;
    padding-bottom: 32px;
  }
  .book-image img {
    max-width: 100%;
    max-height: 500px;
  }

  .book-main {
    display: flex;
    font-size: 16px;
  }
  .book-section {
    display: flex;
    flex-flow: column;
    align-items: space-between;
  }
  .book-favourites {
    background-color: rgba(15%, 66%, 88%, 0.1);
    padding: 0 20px;
    border: none;

    cursor: pointer;
    margin-bottom: 10px;
    line-height: 32px;
    width: 240px;
  }
  .book-author {
    margin-bottom: 10px;
  }
  .book-main h1 {
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .book-rating {
    display: flex;
    margin-top: 10px;
  }

  .book-add-rating {
    cursor: pointer;
    color: #26a9e0;
    border-bottom: 1px dashed;
    margin: 0 60px 0 10px;
  }
  .book-rating div {
    margin-right: 10px;
  }
  .book-description {
    margin-top: 30px;
  }
  .book-price {
    margin-top: 60px;
    font-size: 24px;
    font-weight: bold;
  }
  .book-options {
    display: flex;
    & div {
      cursor: pointer;
      margin-top: 30px;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

interface StyledButtonI {
  readonly widthSmall?: boolean;
}

export const StyledButton = styled.button<StyledButtonI>`
  margin-top: 19px;
  width: ${(props) => (props.widthSmall ? "140px" : "280px")};
  border-radius: 3px;
  color: #ffffff;
  background-color: #26a9e0;
  border: none;
  font-size: 18px;
  height: 48px;
  cursor: pointer;
`;
export const StyledMainPage = styled.section`
  display: flex;
  .paginateContainer {
    display: flex;
    justify-content: center;
    cursor: pointer;
    backgeound-color: white;
    padding: 10px;
  }
  .pageLink {
    padding: 5px 10px;
  }
  .pageLink:hover {
    box-shadow: inset 0 0 3px #26a9e0;
  }
  .page {
    margin: 0 5px;
  }
  .activePage {
  }

  .activeLink {
    background-color: #26a9e0;
    border-radius: 4px;
    transition: 0.2s ease-in;
    color: white;
  }
  .previousLink {
    padding: 5px 10px;
  }
  .nextLink {
    padding: 5px 10px;
  }
`;
export const StyledAside = styled.aside`
  width: 18.5%;
  height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 20px 0 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 20px;
  .author-filter {
    display: flex;
    flex-flow: column;
    margin: 10px 0;
  }
  .category-filter {
    display: flex;
    flex-flow: column;
    margin-bottom: 10px;
  }
`;

export const StyledSection = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  .book-container {
    display: flex;
    flex-flow: wrap;
  }
  .book-notFound {
    margin: 60px auto;
  }
`;

export const StyledReview = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  dislay: flex;
  flex-flow: column;
  padding: 24px;
  margin: 20px 0;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #cccccc;

  b {
    padding: 0;
    margin: 0;
  }
  & * {
    margin: 0 10px 10px 10px;
  }
  & > div:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
  }
`;

export const StyledSubHeader = styled.div`
  display: flex;
  width: 100%;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
  border-bottom: 0.5px solid #555;
  & li {
    padding: 0;
    margin: 0;
  }
  & a {
    margin: 0;
    margin-right: 10px;
  }
  & a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: #333;
  }
  & li:hover {
    padding-bottom: 3px;
    color: #26a9e0;
    border-bottom: 5px solid #26a9e0;
  }
`;

export const StyledUserProfile = styled.section`
  & > div {
    display: flex;
    flex-flow: column;
    margin: 0 auto;
    width: 500px;
  }
  & > div div {
    margin-bottom: 10px;
  }
`;

interface StyledEditBookI {
  readonly display_none?: boolean;
}

export const StyledEditBook = styled.div<StyledEditBookI>`
  display: ${(props) => (props.display_none ? "none" : "absolute")}
  width:100%;
  height:100%;
`;

const appearPopUp = keyframes`
from {
  top: -330%;
  right: -190%;
}
to {
  top: -330%;
  right: -120%;
}
`;

export const StyledNotificationPopUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 70px;
  border: 1px solid #26a9e0;
  border-radius: 4px;
  color: #26a9e0;
  background-color: #fff;
  position: relative;
  animation: 1s ease-in 0s ${appearPopUp};
  top: -330%;
  right: -120%;
`;

interface StyledHeaderNotificationI {
  displayNone?: boolean;
}

export const StyledHeaderNotification = styled.div<StyledHeaderNotificationI>`
  display: ${(props) => (props.displayNone ? "none" : "flex")};
  flex-flow: column;
  width: 300px;
  height: 9vh;
  font-size: 14px;
  background-color: #fff;
  color: #26a9e0;
  padding: 5px 10px;
  border-radius: 4px;
  overflow: auto;
  word-break: break-all;
  position: absolute;
  border: 1px solid #26a9e0;
  left: 10%;
  top: 80%;
`;

export const StyledNotification = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;
