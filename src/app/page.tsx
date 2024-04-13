import Header from "@/components/Header";
import 캘린더와일정 from "@/components/캘린더와일정";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-sm p-4 m-auto mb-20">
        {/* TODO 캘린더 스타일 */}
        <캘린더와일정 />
      </main>

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
