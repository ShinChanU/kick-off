"use client";

import Schedules from "@/app/schedules/Schedules";
import {
  DATE_FORMAT_QUERY,
  SCHEDULE_MATCH_DAY_SEARCH_PARAMS,
} from "@/app/schedules/consts";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export default function ScheduleCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // init today

  const handleSelectDate: SelectSingleEventHandler = (eventDate) => {
    if (!eventDate) return;

    const isSameDate = isSameDay(selectedDate, eventDate);
    const defaultDate = format(eventDate, DATE_FORMAT_QUERY);

    // 선택한 날짜 > 일정 추가로 이동
    if (isSameDate) {
      router.push(
        `/schedules/add?${SCHEDULE_MATCH_DAY_SEARCH_PARAMS}=${defaultDate}`
      );
      return;
    }

    setSelectedDate(eventDate);
  };

  const selectedDateKorText = format(selectedDate, "d일 EEE요일", {
    locale: ko,
  });

  return (
    <section>
      {/* calender area */}
      <Calendar
        mode={"single"}
        selected={selectedDate}
        onSelect={handleSelectDate}
        className={"flex justify-center"}
        required
      />
      <Separator />

      {/* schedule area */}
      <div className={"mt-3 text-title-lg font-bold"}>
        {selectedDateKorText} {"일정"}
      </div>
      <Schedules selectedDate={selectedDate} />
    </section>
  );
}
