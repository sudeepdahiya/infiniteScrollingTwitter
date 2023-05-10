import React, { useLayoutEffect, useRef } from "react";

const InfiniteRow = (props) => {
  const { data, comp: Comp, setHeight, id, h } = props;

  const ref = useRef(null);

  useLayoutEffect(() => {
    setHeight(id, ref.current.clientHeight + 1);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${h}px`,
        width: "100%",
      }}
    >
      <Comp {...data} />
    </div>
  );
};

export default React.memo(InfiniteRow);
