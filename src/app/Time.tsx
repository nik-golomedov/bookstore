import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
type TimePropsType = {
    createTime:string
}
const Time = ({createTime}:TimePropsType) => {
  let timeAgo = "";
  if (createTime) {
    const date = parseISO(createTime);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <div>
      <span title={createTime}>
        &nbsp; <i>{timeAgo}</i>
      </span>
    </div>
  );
};

export default Time;
