import { useTimerContext } from "../../contexts/TimerContext";

export default function TimerDisplay() {
  const { hours, seconds, minutes, isOverTime } = useTimerContext();

  return (
    <div style={{ fontSize: "100px", color: isOverTime ? "red" : "black" }}>
      <span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds <= 9 ? `0${seconds}` : seconds}</span>
    </div>
  );
}
