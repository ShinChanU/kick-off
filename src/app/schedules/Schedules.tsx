import { DATE_FORMAT_QUERY } from "@/app/schedules/consts";
import { useScheduleQuery } from "@/app/schedules/queries";
import { TSchedulesRes } from "@/app/schedules/type.server";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TypographyCaption,
  TypographyDescription1,
  TypographyDescription2,
  TypographyTitle2,
} from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

type TProps = {
  selectedDate: Date;
};

export default function Schedules(props: TProps) {
  // TODO server CORS
  const scheduleQuery = useScheduleQuery({
    startDate: format(props.selectedDate, DATE_FORMAT_QUERY),
    endDate: format(props.selectedDate, DATE_FORMAT_QUERY),
  });

  if (
    scheduleQuery.isPending ||
    scheduleQuery.isError ||
    !scheduleQuery.data.length
  ) {
    const intoText = (() => {
      if (scheduleQuery.isPending)
        return "⚽️ ... 일정을 불러오는 중입니다 ... ⚽️";
      if (scheduleQuery.isError)
        return `일정을 불러오지 못했습니다.\n재시도 해주세요.`;
      if (!scheduleQuery.data.length)
        return `일정이 없습니다.\n원하는 날짜에 일정을 추가해주세요.`;
    })();

    return (
      <div className={"mt-4 whitespace-pre-wrap text-center text-desc-lg"}>
        {intoText}
      </div>
    );
  }

  return (
    <div className={"mt-4 flex max-h-64 flex-col gap-3 overflow-auto"}>
      {scheduleQuery.data.map((item, i) => (
        <>
          <ScheduleItem key={item.scheduleId} {...item} />
          {scheduleQuery.data.length - 1 !== i && <Separator />}
        </>
      ))}
    </div>
  );
}

const ScheduleItem = (props: TSchedulesRes) => {
  // TODO 방장이름
  const ROOM_MANAGER = "";
  const halfParticipantCount = props.participantCount;

  const handleClickParticipateButton = () => {
    toast({
      variant: "default",
      title: "개발 중인 기능입니다.",
    });
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <TypographyTitle2>{props.title}</TypographyTitle2>
      <div className={"flex items-center justify-between gap-3"}>
        <div className={"flex items-center gap-3"}>
          <TypographyDescription1>{`${props.startTime}-${props.endTime}`}</TypographyDescription1>

          <div className={"flex flex-col gap-1"}>
            <TypographyDescription2>{props.location}</TypographyDescription2>
            <TypographyCaption>
              {ROOM_MANAGER ? `방장: ${ROOM_MANAGER} ` : ""}
              {`${halfParticipantCount}vs${halfParticipantCount}`}
            </TypographyCaption>
          </div>
        </div>

        <Button className={"h-9 w-16"} onClick={handleClickParticipateButton}>
          {"참여"}
        </Button>
      </div>
    </div>
  );
};
