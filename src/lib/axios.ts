import axios, { AxiosRequestConfig } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const $axios = axios.create({
  baseURL: BACKEND_URL,
});

type THttpMethodParams = {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
};

export const http = {
  get: async <T>({ url, config = {} }: Omit<THttpMethodParams, "data">) => {
    const res = await $axios.get<T>(url, config);
    return res.data;
  },
  post: async <T>({ url, data, config = {} }: THttpMethodParams) => {
    const res = await $axios.post<T>(url, data, config);
    return res.data;
  },
  put: async <T>({ url, data, config = {} }: THttpMethodParams) => {
    const res = await $axios.put<T>(url, data, config);
    return res.data;
  },
  patch: async <T>({ url, data, config = {} }: THttpMethodParams) => {
    const res = await $axios.patch<T>(url, data, config);
    return res.data;
  },
  delete: async <T>({ url, config = {} }: Omit<THttpMethodParams, "data">) => {
    const res = await $axios.delete<T>(url, config);
    return res.data;
  },
  postForm: async <T>({ url, data, config = {} }: THttpMethodParams) => {
    const res = await $axios.postForm<T>(url, data, config);
    return res.data;
  },
};
