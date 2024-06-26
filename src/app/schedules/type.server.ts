// response
export type TSchedulesRes = {
  scheduleId: number;
  title: string;
  location: string;
  participantCount: number;
  matchDay: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
};

// request
export type TSchedulesPostReq = Pick<
  TSchedulesRes,
  | "endTime"
  | "location"
  | "matchDay"
  | "participantCount"
  | "startTime"
  | "title"
>;

// query parameters
export type TScheduleQueryString = { startDate: string; endDate: string };
