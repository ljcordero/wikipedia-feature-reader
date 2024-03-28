import { saveVisitedFeeds } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FeedSliceState = {
  visitedFeeds: [],
};

export const feedSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addVisitedFeed: (state, action) => {
      state.visitedFeeds.push(Number(action.payload));
      saveVisitedFeeds(state.visitedFeeds);
    },
  },
});

export type FeedSliceState = {
  visitedFeeds: number[];
};
