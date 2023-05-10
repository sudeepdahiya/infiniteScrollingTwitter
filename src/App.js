import { useEffect, useState } from "react";
import Infinite from "./infinite/Infinite";

import Box from "./Box";
import "./App.css";

function getRandomText(min = 10, max = 20) {
  const val = "abcdefghijklmnopqrstuvwxyz     ";
  const i = randomNumber(min, max);
  let str = val[randomNumber(0, val.length - 5)].toUpperCase();
  for (let j = 1; j < i; j++) {
    let randomChar = randomNumber(0, val.length);
    str += val[randomChar];
  }
  return str;
}

function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

const getData = () => {
  const d = Array(100);
  for (let i = 0; i < d.length; i++) {
    d[i] = {
      id: i,
      title: getRandomText(10, 20),
      desc: getRandomText(20, 500),
    };
  }
  return d;
};

function App() {
  const [dataList, setData] = useState(getData());

  useEffect(() => {
    // setTimeout(() => {
    //   setData([...dataList, ...getData()]);
    //   console.log("this is called");
    // }, 5000);
  }, [dataList.length]);

  return (
    <div className="app">
      <div>this is header</div>
      <Infinite dataList={dataList} comp={Box} />
    </div>
  );
}

export default App;
