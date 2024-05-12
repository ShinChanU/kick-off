import { SchedulesAPI } from "@/app/schedules/api";
import { DATE_FORMAT_TIME } from "@/app/schedules/consts";
import { TScheduleQueryString } from "@/app/schedules/type.server";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, isBefore, toDate } from "date-fns";
import { useRouter } from "next/navigation";

const SchedulesQueryKeys = {
  all: ["schedules"] as const,
  getSchedules: (params: TScheduleQueryString) =>
    [...SchedulesQueryKeys.all, "getSchedules", params] as const,
};

const useScheduleQuery = (params: TScheduleQueryString) => {
  return useQuery({
    queryKey: SchedulesQueryKeys.getSchedules(params),
    queryFn: () => SchedulesAPI.getSchedules(params),
    select: (res) => {
      const sortedResponse = res.toSorted((next, prev) => {
        const nextTime = toDate(`${next.matchDay} ${next.startTime}`);
        const prevTime = toDate(`${prev.matchDay} ${prev.startTime}`);
        return isBefore(nextTime, prevTime) ? -1 : 1;
      });

      return sortedResponse.map((item) => {
        const startTimeWithDate = `${item.matchDay} ${item.startTime}`;
        const endTimeWithDate = `${item.matchDay} ${item.endTime}`;

        return {
          ...item,
          startTime: format(startTimeWithDate, DATE_FORMAT_TIME),
          endTime: format(endTimeWithDate, DATE_FORMAT_TIME),
        };
      });
    },
  });
};

const useScheduleAddMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SchedulesAPI.postSchedules,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SchedulesQueryKeys.all });
      router.push("/");
      toast({
        variant: "default",
        title: "일정을 추가했습니다.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "일정을 추가하지 못했습니다.",
      });
    },
  });
};

export { SchedulesQueryKeys, useScheduleAddMutation, useScheduleQuery };
