"use client";

import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";

export default function 캘린더와일정() {
  const [date, setDate] = useState<Date>(new Date());

  const SELECTED_DATE_KOR_TEXT = format(date, "d일 EEE요일", { locale: ko });
  const EMPTY_PLAN_TEXT = `일정이 없습니다.\n원하는 날짜에 일정을 추가해주세요.`;

  return (
    <section>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(e) => setDate(e!)}
        className="flex justify-center"
        locale={ko}
        required
      />

      <Separator />

      <div className="mt-3 text-2xl font-bold">
        {SELECTED_DATE_KOR_TEXT} 일정
      </div>

      {/* TODO 일정 API */}
      <div className="mt-3 text-center whitespace-pre-wrap">
        {EMPTY_PLAN_TEXT}
      </div>
    </section>
  );
}
