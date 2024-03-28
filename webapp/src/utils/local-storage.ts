import { LOCAL_STORAGE_VISITED_FEEDS_KEY } from "@/constants";

export const saveVisitedFeeds = (visitedFeeds: number[]) => {
  localStorage.setItem(
    LOCAL_STORAGE_VISITED_FEEDS_KEY,
    JSON.stringify(visitedFeeds),
  );
};

export const getVisitedFeeds = (): number[] => {
  const value = JSON.parse(get(LOCAL_STORAGE_VISITED_FEEDS_KEY) || "[]");
  return Array.isArray(value) && value.every((x) => !isNaN(x)) ? value : [];
};

const get = (key: string): string | null => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};
