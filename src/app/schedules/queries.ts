import { SchedulesAPI } from "@/app/schedules/api";
import { TScheduleQueryString } from "@/app/schedules/type.server";
import { useMutation, useQuery } from "@tanstack/react-query";

const SchedulesQueryKeys = {
  all: ["schedules"] as const,
  getSchedules: (params: TScheduleQueryString) =>
    [...SchedulesQueryKeys.all, "getSchedules", params] as const,
};

const useScheduleQuery = (params: TScheduleQueryString) => {
  return useQuery({
    queryFn: () => SchedulesAPI.getSchedules(params),
    queryKey: SchedulesQueryKeys.getSchedules(params),
  });
};

const useScheduleAddMutation = () => {
  return useMutation({
    mutationFn: SchedulesAPI.postSchedules,
  });
};

export { SchedulesQueryKeys, useScheduleAddMutation, useScheduleQuery };
