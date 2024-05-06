import { addMinutes, format } from "date-fns";

const generateTimeIntervals = ({
  start,
  end,
  interval,
}: {
  start: Date;
  end: Date;
  interval: number;
}) => {
  const timeIntervals = [];
  let currentTime = start;

  while (currentTime <= end) {
    timeIntervals.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeIntervals;
};

export { generateTimeIntervals };
