"use client";

import { generateTimeIntervals } from "@/app/schedules/add/helper";
import {
  DATE_FORMAT_QUERY,
  DATE_FORMAT_VIEW,
  SCHEDULE_MATCH_DAY_SEARCH_PARAMS,
} from "@/app/schedules/consts";
import { useScheduleAddMutation } from "@/app/schedules/queries";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TypographyDescription1,
  TypographyTitle2,
} from "@/components/ui/typography";
import useModalHook from "@/hook/useModalHook";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, toDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const REQUIRED_ERR_MSG = "필수 입력값 입니다.";

const formSchema = z.object({
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

export default function ScheduleAddForm() {
  const FORM_ID = useId();
  const router = useRouter();
  const cancelConfirmModal = useModalHook();
  const submitConfirmModal = useModalHook();
  const searchParams = useSearchParams();
  const matchDefaultDate = searchParams.get(SCHEDULE_MATCH_DAY_SEARCH_PARAMS);

  const scheduleAddMutation = useScheduleAddMutation();

  const defaultDate = matchDefaultDate ? toDate(matchDefaultDate) : new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      matchDay: defaultDate,
    },
    mode: "onChange",
  });

  const startTimeOptions = generateTimeIntervals({
    start: new Date(0, 0, 0, 0, 0),
    end: new Date(0, 0, 0, 23, 50),
    interval: 10,
  });

  const playTimeHourOptions = Array.from({ length: 24 }, (_, i) => i + 1);
  const participantsCountOptions = Array.from(
    { length: 11 },
    (_, i) => (i + 1) * 2
  );

  const handleRouterBack = () => {
    router.back();
  };

  const onSubmit = () => {
    submitConfirmModal.onShow();
  };

  const submitMutate = () => {
    const submitForm = form.getValues();
    // TODO 헬퍼함수 (컨버터함수)

    scheduleAddMutation.mutate(
      {
        title: submitForm.title,
        startTime: submitForm.startTime,
        endTime: submitForm.startTime, // TODO endTime 계산
        participantCount: Number(submitForm.participantCount),
        location: submitForm.location,
        matchDay: format(submitForm.matchDay, DATE_FORMAT_QUERY),
      },
      {
        onSuccess: () => {}, // 닫기, 홈으로 이동, 쿼리무효화
        onError: () => {}, // 에러 토스트
      }
    );
  };

  const { isDirty, isValid } = form.formState;

  return (
    <>
      <div className="flex flex-1 flex-col gap-8">
        {/* TODO form 컴포넌트 분리 */}
        {/* form */}
        <Form {...form}>
          <form
            id={FORM_ID}
            className="flex flex-1 flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* matchDay */}
            <FormField
              control={form.control}
              name="matchDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>날짜</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, DATE_FORMAT_VIEW)
                          ) : (
                            <span>날짜를 선택해주세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* start Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시작 시간</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="시작 시간을 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {startTimeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* play Time */}
            <FormField
              control={form.control}
              name="playTimeHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>경기 시간</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="경기 시간을 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {playTimeHourOptions.map((time) => (
                        <SelectItem key={time} value={`${time}`}>
                          {`+${time}시간`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                  <FormDescription>
                    경기 종료시간은 시작 시간 + 경기 시간으로 설정됩니다.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="경기 제목을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* participants */}
            <FormField
              control={form.control}
              name="participantCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인원</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="참여 인원을 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {participantsCountOptions.map((count) => (
                        <SelectItem key={count} value={`${count}`}>
                          {`${count}명`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* location */}
            {/* TODO 추후에 이넘으로 받으면 좋을듯 */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>장소</FormLabel>
                  <FormControl>
                    <Input placeholder="경기 장소를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO 사진 추가 */}
          </form>
        </Form>

        {/* button */}
        <div className="flex w-full gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="flex-1"
            onClick={() => {
              if (isDirty) {
                cancelConfirmModal.onShow();
                return;
              }

              router.back();
            }}
          >
            <TypographyTitle2>취소</TypographyTitle2>
          </Button>
          <Button
            form={FORM_ID}
            type="submit"
            size="lg"
            className="flex-1"
            disabled={!isValid}
          >
            <TypographyTitle2>생성</TypographyTitle2>
          </Button>
        </div>
      </div>

      <Modal
        headerText="일정 추가를 취소하시겠어요?"
        headerAlign="center"
        isOpen={cancelConfirmModal.isOpen}
        subText={`페이지 이탈시\n 입력한 정보는 저장되지 않습니다.`}
        leftButtonLabel="닫기"
        leftHandleClick={cancelConfirmModal.onHide}
        rightButtonLabel="나가기"
        rightHandleClick={handleRouterBack}
      />

      {/* TODO 리팩토링, map */}
      <Modal
        headerText="일정 최종 확인"
        isOpen={submitConfirmModal.isOpen}
        leftButtonLabel="취소"
        leftHandleClick={submitConfirmModal.onHide}
        rightButtonLabel="생성"
        rightHandleClick={submitMutate}
      >
        <div>
          <div className="flex gap-3">
            <TypographyTitle2>날짜</TypographyTitle2>
            {/* TODO 오전 오후로 변경, 시간 더하기 */}
            <TypographyDescription1>{`${format(form.watch("matchDay"), DATE_FORMAT_VIEW)}\n${form.watch("startTime")} ~ 더한시간`}</TypographyDescription1>
          </div>

          <div className="flex items-center gap-3">
            <TypographyTitle2>제목</TypographyTitle2>
            <TypographyDescription1>{`${form.watch("title")}`}</TypographyDescription1>
          </div>

          <div className="flex items-center gap-3">
            <TypographyTitle2>장소</TypographyTitle2>
            <TypographyDescription1>{`${form.watch("location")}`}</TypographyDescription1>
          </div>

          <div className="flex items-center gap-3">
            <TypographyTitle2>인원</TypographyTitle2>
            <TypographyDescription1>{`${form.watch("participantCount")}명`}</TypographyDescription1>
          </div>
        </div>
      </Modal>
    </>
  );
}
