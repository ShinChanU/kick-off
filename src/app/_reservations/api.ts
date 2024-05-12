import {
  TReservationQueryString,
  TReservationRes,
} from "@/app/_reservations/type.server";
import { http } from "@/lib/axios";

const URLS = {
  getSeoulSportReservationInfo: `/seoul-sport/reservation-info`,
};

const ReservationsAPI = {
  getReservations: (params: TReservationQueryString) => {
    return http.get<TReservationRes>({
      url: URLS.getSeoulSportReservationInfo,
      config: { params },
    });
  },
};

export { ReservationsAPI };
