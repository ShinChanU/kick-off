import { TScheduleSchema } from "@/app/schedules/add/ScheduleAddFormSchema";
import { DATE_FORMAT_QUERY, DATE_FORMAT_TIME } from "@/app/schedules/consts";
import { TSchedulesPostReq } from "@/app/schedules/type.server";
import { addHours, addMinutes, format, toDate } from "date-fns";

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

const convertScheduleFormToRequest = ({
  title,
  location,
  matchDay,
  participantCount,
  playTimeHour,
  startTime,
}: TScheduleSchema): TSchedulesPostReq => {
  const matchDayFormatQuery = format(matchDay, DATE_FORMAT_QUERY);
  const matchDayWithTime = toDate(`${matchDayFormatQuery} ${startTime}`);
  const matchDayEndTimeFormatDate = addHours(
    matchDayWithTime,
    Number(playTimeHour)
  );
  const endTime = format(matchDayEndTimeFormatDate, DATE_FORMAT_TIME);

  return {
    matchDay: matchDayFormatQuery,
    startTime,
    endTime,
    title,
    participantCount: Number(participantCount),
    location,
  };
};

export { convertScheduleFormToRequest, generateTimeIntervals };
