import React, { createContext, useContext } from "react";
import { useTimer } from "react-timer-hook";

const TimerContext = createContext();

export const TimerProvider = ({ expiryTimestamp, onExpire, children }) => {
  const timer = useTimer({
    expiryTimestamp,
  });

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  return useContext(TimerContext);
};
