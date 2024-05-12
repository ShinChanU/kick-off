"use client";

import ConfirmModal from "@/app/schedules/add/ConfirmModal";
import ScheduleAddForm from "@/app/schedules/add/ScheduleAddForm";
import {
  ScheduleFormSchema,
  TScheduleSchema,
} from "@/app/schedules/add/ScheduleAddFormSchema";
import { SCHEDULE_MATCH_DAY_SEARCH_PARAMS } from "@/app/schedules/consts";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { TypographyTitle2 } from "@/components/ui/typography";
import useModalHook from "@/hook/useModalHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { toDate } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";

export default function ScheduleAddFormWrapper() {
  // client
  const FORM_ID = useId();
  const router = useRouter();
  const cancelConfirmModal = useModalHook();
  const submitConfirmModal = useModalHook();
  const searchParams = useSearchParams();
  const matchDefaultDate = searchParams.get(SCHEDULE_MATCH_DAY_SEARCH_PARAMS);

  // RHF
  const defaultDate = matchDefaultDate ? toDate(matchDefaultDate) : new Date();
  const form = useForm<TScheduleSchema>({
    resolver: zodResolver(ScheduleFormSchema),
    defaultValues: {
      title: "",
      location: "",
      matchDay: defaultDate,
    },
    mode: "onChange",
  });

  const handleRouterBack = () => {
    router.back();
  };

  const onSubmit = () => {
    submitConfirmModal.onShow();
  };

  const { isDirty, isValid } = form.formState;
  return (
    <>
      <div className={"flex flex-1 flex-col gap-8"}>
        {/* form */}
        <ScheduleAddForm FORM_ID={FORM_ID} form={form} onSubmit={onSubmit} />

        {/* button */}
        <div className={"flex w-full gap-3"}>
          <Button
            size={"lg"}
            variant={"secondary"}
            className={"flex-1"}
            onClick={() => {
              if (isDirty) {
                cancelConfirmModal.onShow();
                return;
              }

              router.back();
            }}
          >
            <TypographyTitle2>{"취소"}</TypographyTitle2>
          </Button>
          <Button
            form={FORM_ID}
            type={"submit"}
            size={"lg"}
            className={"flex-1"}
            disabled={!isValid}
          >
            <TypographyTitle2>{"생성"}</TypographyTitle2>
          </Button>
        </div>
      </div>

      {/* modal */}
      <Modal
        headerText={"일정 추가를 취소하시겠어요?"}
        headerAlign={"center"}
        isOpen={cancelConfirmModal.isOpen}
        subText={`페이지 이탈시\n 입력한 정보는 저장되지 않습니다.`}
        leftButtonLabel={"닫기"}
        leftHandleClick={cancelConfirmModal.onHide}
        rightButtonLabel={"나가기"}
        rightHandleClick={handleRouterBack}
      />

      {submitConfirmModal.isOpen && (
        <ConfirmModal form={form} modalState={submitConfirmModal} />
      )}
    </>
  );
}
