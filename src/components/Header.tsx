"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeModeToggle";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMount, setMount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  // const isPrevButton =
  //   typeof window !== "undefined" && window.history.length > 1;

  const handleGoBack = () => {
    router.back();
  };

  return (
    isMount && (
      <header className="sticky top-0 z-10 flex items-center justify-center max-w-screen-sm p-4 m-auto border-b bg-inherit">
        <div className="absolute">
          {false && (
            <Button variant="link" onClick={handleGoBack}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
        </div>

        <div className="text-3xl font-bold text-center font-giants">
          Kick-off
        </div>

        <div className="absolute right-0 pr-4">
          <ModeToggle />
        </div>
      </header>
    )
  );
}
