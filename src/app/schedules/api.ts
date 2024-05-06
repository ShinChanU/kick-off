import {
  TScheduleQueryString,
  TSchedulesPostReq,
} from "@/app/schedules/type.server";
import { http } from "@/lib/axios";

const URLS = {
  getSchedules: () => `/schedules/schedules`,
  postSchedules: () => `/schedules`,
};

const SchedulesAPI = {
  getSchedules: (params: TScheduleQueryString) => {
    return http.get({ url: URLS.getSchedules(), config: { params } });
  },
  postSchedules: (data: TSchedulesPostReq) => {
    return http.post({ url: URLS.postSchedules(), data });
  },
};

export { SchedulesAPI };
