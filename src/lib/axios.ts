"use client";

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const $axios = axios.create({
  baseURL: BACKEND_URL,
});
