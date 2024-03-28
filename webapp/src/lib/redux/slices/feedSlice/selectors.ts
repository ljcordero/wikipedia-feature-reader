import type { ReduxState } from "@/lib/redux";

export const getVisitedFeeds = (state: ReduxState) => state.feed.visitedFeeds;
