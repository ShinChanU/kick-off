import ScheduleAddForm from "@/app/schedules/add/ScheduleAddFom";
import { TypographyTitle1 } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <TypographyTitle1>일정 추가</TypographyTitle1>
      <ScheduleAddForm />
    </div>
  );
}
