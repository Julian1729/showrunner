// import { useTimer } from "react-timer-hook";

// TODO: should support hours
export default function SectionTimer({ minutes, seconds, isOverTime }) {
  return (
    <div style={{ fontSize: "30px", color: isOverTime ? "red" : "black" }}>
      <span>{minutes}</span>:
      <span>{seconds <= 9 ? `0${seconds}` : seconds}</span>
    </div>
  );
}
