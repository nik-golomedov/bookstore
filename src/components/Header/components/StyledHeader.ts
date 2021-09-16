import styled from "styled-components";

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
  li {
    margin: 0 50px 0 0;
  }
`;

interface StyledHeaderNotificationI {
  displayNone?: boolean;
}

export const StyledHeaderNotification = styled.div<StyledHeaderNotificationI>`
  display: ${(props) => (props.displayNone ? "none" : "flex")};
  flex-direction: column;
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
  .notification-time {
    text-align: end;
    margin-top: 4px;
    color: #247fa7;
  }
`;
