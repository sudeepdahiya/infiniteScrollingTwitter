import React from "react";

const Box = (props) => {
  const { title, desc } = props;

  return (
    <div className="descBox">
      <div>{title}</div>
      <div>{desc}</div>
    </div>
  );
};

export default Box;
