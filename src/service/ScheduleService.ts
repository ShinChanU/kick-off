import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// class ScheduleService {
//   static postSchedule() {
//     return Service.http.post(`/schedules`);
//   }
// }

// const queryKeys = {
//   all: ["schedules"] as const,
// };

// export const queryOptions = {
//   // all: () => ({
//   //   queryKey: queryKeys.all,
//   //   queryFn: () => PhotoService.getPhotos(),
//   // }),
// };

const $axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export function useScheduleCreateMutation() {
  return useMutation({ mutationFn: (data) => $axios.post("/schedules", data) });
}
