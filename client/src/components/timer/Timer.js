import React, { useState } from "react";

import "./Timer.css";

const Timer = ({ date, name }) => {
  const [time, setTime] = useState("");

  const countDownDate = new Date(date).getTime();

  const x = setInterval(() => {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTime(`${days}D ${hours}H ${minutes}M ${seconds}S`);

    if (distance < 0) {
      clearInterval(x);
      setTime(`Time Reached! ${"\n"} ${new Date(date)}`);
    }
  }, 1000);

  return <strong>{time}</strong>;
};

export default Timer;
