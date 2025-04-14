import { Typography } from "@mui/material";
import moment from "moment";

export default function TimeDifferenceDisplay({ secondsDifference = 0 }) {
  return (
    <Typography
      variant="h6"
      color={secondsDifference >= 0 ? "success" : "error"}
    >
      {moment
        .utc(
          moment
            .duration(Math.abs(secondsDifference), "seconds")
            .asMilliseconds()
        )
        .format("mm:ss")}
    </Typography>
  );
}
