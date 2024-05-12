import {
  TScheduleQueryString,
  TSchedulesPostReq,
  TSchedulesRes,
} from "@/app/schedules/type.server";
import { http } from "@/lib/axios";

const URLS = {
  getSchedules: `/schedules/schedules`,
  postSchedules: `/schedules`,
};

const SchedulesAPI = {
  // 일정 조회
  getSchedules: (params: TScheduleQueryString) => {
    return http.get<TSchedulesRes[]>({
      url: URLS.getSchedules,
      config: { params },
    });
  },

  // 일정 등록
  postSchedules: (data: TSchedulesPostReq) => {
    return http.post<{ scheduleId: number }>({
      url: URLS.postSchedules,
      data,
    });
  },
};

export { SchedulesAPI };
