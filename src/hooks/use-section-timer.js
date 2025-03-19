import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const useSectionTimer = ({ expiryTimestamp = null, onExpire }) => {
  const hook = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: false,
  });

  useEffect(() => {
    hook.restart(expiryTimestamp, true);
    console.log("rstarting", expiryTimestamp);
  }, [expiryTimestamp]);

  return hook;
};

export default useSectionTimer;
