import React, { createContext, useContext } from "react";

import useSectionTimer from "../hooks/use-section-timer";

const TimerContext = createContext();

export const TimerProvider = ({ expiryTimestamp, onExpire, children }) => {
  // const timer = useTimer({
  //   expiryTimestamp,
  // });

  const presentationTimer = useSectionTimer({
    expiryTimestamp: expiryTimestamp,
  });

  return (
    <TimerContext.Provider value={presentationTimer}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  return useContext(TimerContext);
};
