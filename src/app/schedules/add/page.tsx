import ScheduleAddFormWrapper from "@/app/schedules/add/ScheduleAddFormWrapper";
import { TypographyTitle1 } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className={"flex flex-1 flex-col gap-8"}>
      <TypographyTitle1>{"일정 추가"}</TypographyTitle1>

      <ScheduleAddFormWrapper />
    </div>
  );
}
