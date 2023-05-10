import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InfiniteRow from "./InfiniteRow";
import "./Infinite.css";

const BOUNDRY = 200;

const debounce = (func, delay) => {
  let timeout;
  return function executed() {
    const later = () => {
      timeout = null;
      func.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

function Infinite(props) {
  const { dataList, comp } = props;

  const ref = useRef(null);

  const [scroll, setScroll] = useState({});
  const [[min, max], setMinMax] = useState([0, window.innerHeight]);

  const setMinMaxDebounce = useCallback(debounce(setMinMax, 0), [setMinMax]);

  const getScroll = useCallback(
    (e) => {
      setMinMaxDebounce([
        e.target.scrollTop,
        e.target.scrollTop + ref.current.clientHeight,
      ]);
    },
    [setMinMaxDebounce]
  );

  useEffect(() => {
    let a = ref.current;
    a?.addEventListener("scroll", getScroll);
    return () => {
      a?.removeEventListener("scroll", getScroll);
    };
  }, [ref, getScroll]);

  const setHeight = (i, val) => {
    setScroll((prev) => ({
      ...prev,
      [i]: { val },
    }));
  };

  const [scollData, total] = useMemo(() => {
    let total = 0;
    let scollD = { ...scroll };
    for (let k in scroll) {
      scollD[k].total = total;
      total += scroll[k].val;
    }
    return [scollD, Math.max(total, window.innerHeight)];
  }, [scroll]);

  return (
    <div className="container" ref={ref}>
      <div className="scollApp" style={{ height: `${total}px` }}>
        {dataList.map((val, i) => {
          if (scollData[i]?.hasOwnProperty("total")) {
            if (
              scollData[i].total < min - scroll[i].val - BOUNDRY ||
              scollData[i].total > max + BOUNDRY
            ) {
              return null;
            }
          }
          return (
            <InfiniteRow
              data={val}
              comp={comp}
              setHeight={setHeight}
              h={scollData[i]?.total}
              key={i}
              id={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Infinite;
