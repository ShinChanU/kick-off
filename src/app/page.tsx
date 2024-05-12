import Reservations from "@/app/_reservations/Reservations";
import ScheduleCalendar from "@/app/schedules/ScheduleCalendar";

export default function Home() {
  return (
    <div>
      <ScheduleCalendar />
      <Reservations />

      {/* TODO 바텀 메뉴 */}
      {/* <div className={"fixed bottom-0 left-0 right-0 z-10 flex"}>
        <div
          className={"m-auto w-full max-w-screen-sm border-t bg-inherit p-4"}
        >
          <div className={"text-3xl text-center font-giants font-bold"}>
            {"bottom 메뉴"}
          </div>
        </div>
      </div> */}
    </div>
  );
}
