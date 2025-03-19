import { useTimerContext } from "../../contexts/TimerContext";

export default function TimerDisplay() {
  const { seconds, minutes } = useTimerContext();

  return (
    <div style={{ fontSize: "100px" }}>
      <span>{minutes}</span>:
      <span>{seconds <= 9 ? `0${seconds}` : seconds}</span>
    </div>
  );
}
