import { useEffect } from "react";
import { useTimer, useStopwatch } from "react-timer-hook";

/**
 * This custom hook will start as a timer, but will move to a stopwatch
 * when the timer expires to count up the time overrun.
 */

const useSectionTimer = ({
  expiryTimestamp = null,
  autoPlay = false,
  onNext,
}) => {
  const stopWatchHook = useStopwatch({ autoStart: false });

  const onExpire = () => {
    console.log("onExpire");
    if (autoPlay) {
      return onNext();
    }

    stopWatchHook.start();
    console.log("overtime, stopwatch started");
  };

  const timerHook = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: false,
  });

  useEffect(() => {
    stopWatchHook.pause();
    stopWatchHook.reset(0, false);
    timerHook.restart(expiryTimestamp, true);
    console.log("restarting", expiryTimestamp);
  }, [expiryTimestamp]);

  return {
    isOverTime: stopWatchHook.isRunning,
    ...(stopWatchHook.isRunning ? stopWatchHook : timerHook),
  };
};

export default useSectionTimer;
