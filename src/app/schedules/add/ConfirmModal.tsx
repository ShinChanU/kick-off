"use client";

import { TScheduleSchema } from "@/app/schedules/add/ScheduleAddFormSchema";
import { convertScheduleFormToRequest } from "@/app/schedules/add/helper";
import { useScheduleAddMutation } from "@/app/schedules/queries";
import Modal from "@/components/Modal";
import {
  TypographyDescription1,
  TypographyTitle2,
} from "@/components/ui/typography";
import { TModalReturnType } from "@/hook/useModalHook";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

type TProps = {
  modalState: TModalReturnType;
  form: UseFormReturn<TScheduleSchema>;
};

export default function ConfirmModal(props: TProps) {
  const router = useRouter();

  const scheduleAddMutation = useScheduleAddMutation();
  const requestData = convertScheduleFormToRequest(props.form.getValues());
  const submitMutate = () => {
    scheduleAddMutation.mutate(requestData, {
      onSuccess: () => {
        props.modalState.onHide();
        router.push("/"); // TODO 일정 추가한 날짜의 캘린더 requestData.matchDay
      },
    });
  };

  return (
    <Modal
      headerText={"일정 최종 확인"}
      isOpen={props.modalState.isOpen}
      leftButtonLabel={"취소"}
      leftHandleClick={props.modalState.onHide}
      rightButtonLabel={"생성"}
      rightHandleClick={submitMutate}
    >
      <div>
        <div className={"flex gap-3"}>
          <TypographyTitle2>{"날짜"}</TypographyTitle2>
          <TypographyDescription1>{`${requestData.matchDay}\n${requestData.startTime} ~ ${requestData.endTime}`}</TypographyDescription1>
        </div>

        <div className={"flex items-center gap-3"}>
          <TypographyTitle2>{"제목"}</TypographyTitle2>
          <TypographyDescription1>{requestData.title}</TypographyDescription1>
        </div>

        <div className={"flex items-center gap-3"}>
          <TypographyTitle2>{"장소"}</TypographyTitle2>
          <TypographyDescription1>
            {requestData.location}
          </TypographyDescription1>
        </div>

        <div className={"flex items-center gap-3"}>
          <TypographyTitle2>{"인원"}</TypographyTitle2>
          <TypographyDescription1>
            {requestData.participantCount}
          </TypographyDescription1>
        </div>
      </div>
    </Modal>
  );
}
