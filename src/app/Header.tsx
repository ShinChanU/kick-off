"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeModeToggle";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
      <header
        className={
          "sticky top-0 z-10 m-auto flex w-full max-w-screen-sm items-center justify-center border-b bg-inherit p-4"
        }
      >
        <div className={"absolute"}>
          {false && (
            <Button variant={"link"} onClick={handleGoBack}>
              <ChevronLeft className={"h-6 w-6"} />
            </Button>
          )}
        </div>

        <Link
          href={"/"}
          className={"text-center font-giants text-header font-bold"}
        >
          {"Kick-off"}
        </Link>

        <div className={"absolute right-0 pr-4"}>
          <ModeToggle />
        </div>
      </header>
    )
  );
}
