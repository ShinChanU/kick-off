"use client";

import { useReservationListQuery } from "@/app/_reservations/queries";
import { TReservationRow } from "@/app/_reservations/type.server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TypographyDescription2,
  TypographyTitle1,
  TypographyTitle2,
} from "@/components/ui/typography";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// TODO 리팩토링
export default function Reservations() {
  return (
    <div className={"mt-12"}>
      <TypographyTitle1>{"구장 예약"}</TypographyTitle1>
      <ReservationList />
    </div>
  );
}

const ReservationList = () => {
  const reservationListQuery = useReservationListQuery();

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    hasNextPage: reservationListQuery.hasNextPage,
    isFetchingNextPage: reservationListQuery.isFetchingNextPage,
    fetchNextPage: reservationListQuery.fetchNextPage,
    enabled:
      reservationListQuery.hasNextPage ||
      !reservationListQuery.isLoading ||
      !reservationListQuery.isFetching ||
      !reservationListQuery.isError,
  });

  console.log(reservationListQuery.data);

  if (
    reservationListQuery.isPending ||
    reservationListQuery.isError ||
    !reservationListQuery.data.length
  ) {
    const intoText = (() => {
      if (reservationListQuery.isPending)
        return "⚽️ ... 구장 예약 정보를 불러오는 중입니다. ... ⚽️";
      if (reservationListQuery.isError)
        return `구장 예약 정보를 불러오지 못했습니다.\n재시도 해주세요.`;
      if (!reservationListQuery.data.length)
        return `구장 예약 정보가 없습니다.`;
    })();

    return (
      <div className={"mt-4 whitespace-pre-wrap text-center text-desc-lg"}>
        {intoText}
      </div>
    );
  }

  return (
    <>
      <div className={"mt-3 flex flex-col gap-3"}>
        {reservationListQuery.data.map((info, index) => {
          const isLastItem = index === reservationListQuery.data.length - 1;
          return (
            <Fragment key={info.SVCID}>
              <Item {...info} />
              {!isLastItem && <Separator />}
            </Fragment>
          );
        })}
      </div>
      <div ref={observerRef} />
    </>
  );
};

const Item = (props: TReservationRow) => {
  const myLoader = ({ src }: ImageLoaderProps) => {
    return `${src}`;
  };

  return (
    <div className={"flex items-center gap-3 break-keep"}>
      <div className={"relative min-h-24 min-w-32"}>
        <Image
          loader={myLoader}
          alt={props.PLACENM}
          src={props.IMGURL}
          fill
          className={"object-cover"}
        />
      </div>

      <div className={"flex flex-col justify-between gap-3"}>
        <div className={"space-y-1"}>
          <TypographyTitle2>{props.PLACENM}</TypographyTitle2>
          <TypographyDescription2>
            {props.SVCNM} {`[${props.V_MIN} ~ ${props.V_MAX}]`}
          </TypographyDescription2>
        </div>

        <div className={"flex flex-wrap gap-2 text-caption"}>
          <Badge variant={"secondary"}>{props.AREANM}</Badge>
          <Badge variant={"secondary"}>{props.SVCSTATNM}</Badge>
          <Badge variant={"secondary"}>{props.PAYATNM}</Badge>
        </div>

        <Link target={"_blank"} href={props.SVCURL}>
          <Button variant={"outline"} size={"default"} className={"w-fit"}>
            {"예약 사이트 이동"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
