// import { useTimer } from "react-timer-hook";

// TODO: should support hours
export default function SectionTimer({ minutes, seconds }) {
  // const { seconds, minutes, restart } = useTimer({
  //   expiryTimestamp,
  //   onExpire: () => onExpire(restart),
  // });

  return (
    <div style={{ fontSize: "30px" }}>
      <span>{minutes}</span>:
      <span>{seconds <= 9 ? `0${seconds}` : seconds}</span>
    </div>
  );
}
