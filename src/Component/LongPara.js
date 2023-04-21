import { useState } from "react";

const LongPara = ({ children }) => {
  const text = children;
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <span>{showMore ? text : text.slice(0, 100)}</span>
      <span
        onClick={() => setShowMore((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        <b>{showMore ? "...show less" : "...show more"}</b>
      </span>
    </>
  );
};
export default LongPara;
