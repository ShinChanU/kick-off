"use client";

import {
  DATE_FORMAT_QUERY,
  SCHEDULE_MATCH_DAY_SEARCH_PARAMS,
} from "@/app/schedules/consts";
import { useScheduleQuery } from "@/app/schedules/queries";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export default function ScheduleCalendar() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());

  // TODO server CORS
  const scheduleQuery = useScheduleQuery({
    startDate: format(date, DATE_FORMAT_QUERY),
    endDate: format(date, DATE_FORMAT_QUERY),
  });
  console.log(scheduleQuery.data);

  const SELECTED_DATE_KOR_TEXT = format(date, "d일 EEE요일", { locale: ko });
  const EMPTY_PLAN_TEXT = `일정이 없습니다.\n원하는 날짜에 일정을 추가해주세요.`;

  const handleSelectDate: SelectSingleEventHandler = (eventDate) => {
    if (!eventDate) return;
    const isSameDate = isSameDay(date, eventDate);
    const defaultDate = format(eventDate, DATE_FORMAT_QUERY);

    if (isSameDate) {
      router.push(
        `/schedules/add?${SCHEDULE_MATCH_DAY_SEARCH_PARAMS}=${defaultDate}`
      );
      return;
    }

    setDate(eventDate);
  };

  return (
    <section>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelectDate}
        className="flex justify-center"
        required
      />

      <Separator />

      <div className="mt-3 text-title-lg font-bold">
        {SELECTED_DATE_KOR_TEXT} 일정
      </div>

      {/* TODO 일정 API */}
      <div className="mt-3 whitespace-pre-wrap text-center text-desc-lg">
        {EMPTY_PLAN_TEXT}
      </div>
    </section>
  );
}
