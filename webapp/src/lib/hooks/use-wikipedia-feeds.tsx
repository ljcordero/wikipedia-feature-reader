import {
  GetWikipediaFeedRequestDto,
  WikipediaService,
  getService,
} from "@/lib/services";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetWikipediaFeeds = ({
  language,
  date,
  enabled,
}: GetWikipediaFeedRequestDto & { enabled: boolean }) => {
  const workstreamService = getService(WikipediaService);

  return useInfiniteQuery({
    initialPageParam: {
      language,
      date,
    },
    queryFn: async ({ pageParam }) => {
      return await workstreamService.getFeed(pageParam);
    },
    queryKey: ["WIKIPEDIA_FEED", { language, date }],
    getNextPageParam: ({ date }) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() - 1);

      return {
        date: nextDate,
        language,
      };
    },
    staleTime: Infinity,
    enabled: enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
