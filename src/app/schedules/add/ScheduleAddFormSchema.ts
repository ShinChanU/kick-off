import { z } from "zod";

const REQUIRED_ERR_MSG = "필수 입력값 입니다.";

export type TScheduleSchema = z.infer<typeof ScheduleFormSchema>;

export const ScheduleFormSchema = z.object({
  title: z
    .string({ required_error: REQUIRED_ERR_MSG })
    .min(2, {
      message: "최소 2자 입력해주세요.",
    })
    .max(20, {
      message: "최대 20자를 입력해주세요.",
    }),
  location: z
    .string({ required_error: REQUIRED_ERR_MSG })
    .min(2, {
      message: "최소 2자 입력해주세요.",
    })
    .max(20, {
      message: "최대 20자를 입력해주세요.",
    }),
  participantCount: z.string({ required_error: REQUIRED_ERR_MSG }),
  matchDay: z.date({ required_error: REQUIRED_ERR_MSG }),
  startTime: z.string({ required_error: REQUIRED_ERR_MSG }),
  playTimeHour: z.string({ required_error: REQUIRED_ERR_MSG }),
});
