import ScheduleCalendar from "@/app/schedules/ScheduleCalendar";

export default function Home() {
  return (
    <div>
      <ScheduleCalendar />

      <div className="fixed bottom-0 left-0 right-0 z-10 flex">
        <div className="w-full max-w-screen-sm p-4 m-auto border-t bg-inherit">
          <div className="text-3xl font-bold text-center font-giants">
            bottom 메뉴
          </div>
        </div>
      </div>
    </div>
  );
}
