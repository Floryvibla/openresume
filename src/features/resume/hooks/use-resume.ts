"use client";

import useSWR from "swr";

import { apiClient } from "@/lib/axios";

const fetcher = async <T,>(url: string) => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

export function useResumeList() {
  return useSWR("/api/resumes", fetcher);
}

export function useResumeItem(resumeId?: string) {
  const key = resumeId ? `/api/resumes/${resumeId}` : null;
  return useSWR(key, fetcher);
}
