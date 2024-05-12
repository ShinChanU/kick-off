import { ReservationsAPI } from "@/app/_reservations/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const ReservationsQueryKeys = {
  all: ["Reservations"] as const,
  getReservations: () =>
    [...ReservationsQueryKeys.all, "getReservations"] as const,
};

const useReservationListQuery = () => {
  const MIN_CLASS_NAME = "풋살장"; // 소분류
  const PAGE_SIZE = 5;

  return useInfiniteQuery({
    queryKey: ReservationsQueryKeys.getReservations(),
    queryFn: ({ pageParam }) =>
      ReservationsAPI.getReservations({
        minClassName: MIN_CLASS_NAME,
        startIndex:
          pageParam === 0 ? pageParam * PAGE_SIZE : pageParam * PAGE_SIZE + 1, // HACK 처음에는 N개, 그 뒤로는 N+1 개가 오는 현상 있음
        endIndex: pageParam * PAGE_SIZE + PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      const nextPageStartIndex = (lastPageParams + 1) * PAGE_SIZE;

      if (
        !lastPage ||
        lastPage.ListPublicReservationSport.row.length < PAGE_SIZE
      )
        return undefined;

      return lastPageParams + 1;
    },
    select: (res) => res.pages.flatMap((e) => e.ListPublicReservationSport.row),
  });

  // return useQuery({
  //   queryKey: ReservationsQueryKeys.getReservations(params),
  //   queryFn: () => ReservationsAPI.getReservations(params),
  // });
};

export { ReservationsQueryKeys, useReservationListQuery };
