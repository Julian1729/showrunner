export const getExpiryTimestamp = (minutes) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + minutes * 60);
  return time;
};
