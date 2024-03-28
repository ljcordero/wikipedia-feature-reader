"use client";

import { WikipediaFeed } from "@/app/page";
import { FeedCard } from "../../../components/molecules";
import { FeedsContainerDisplayFormatOption } from "@/components/molecules/feeds-container-display-format";
import { ProgressSpinner } from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from "ts-debounce";

export type FeedsContainerProps = {
  testId?: string;
  className?: string;
  feeds?: WikipediaFeed[];
  hasMore: boolean;
  displayFormat: FeedsContainerDisplayFormatOption;
  onLoadMore: () => void;
  onFeedCardClick: (feed: WikipediaFeed) => void;
};

const LOAD_MORE_DEBOUNCER_WAIT_MILLISECONDS = 500;

export const FeedsContainer = ({
  testId,
  className,
  feeds,
  hasMore,
  displayFormat,
  onLoadMore,
  onFeedCardClick,
}: FeedsContainerProps) => {
  const emptyFeedsContainer = (message: string) => {
    return (
      <div
        data-testid={`${testId}-empty`}
        className="flex-1 border-dotted border-primary-500 text-500 text-3xl w-full surface-overlay border-round font-bold flex align-items-center justify-content-center px-2 text-center"
      >
        {message}
      </div>
    );
  };

  if (feeds == undefined) {
    return emptyFeedsContainer("Select date & language to begin reading 📖");
  }

  if (feeds.length === 0) {
    return emptyFeedsContainer("No feeds were found 🙁");
  }

  // avoid infinite scroll perform concurrent calls
  const loadMoreDebouncer = debounce(
    onLoadMore,
    LOAD_MORE_DEBOUNCER_WAIT_MILLISECONDS,
  );

  return (
    <div data-testid={testId} className={`${className} overflow-auto`}>
      <InfiniteScroll
        loadMore={() => loadMoreDebouncer()}
        hasMore={hasMore}
        useWindow={false}
        loader={
          <div
            key={0}
            className="flex justify-content-center align-items-center h-4rem"
          >
            <ProgressSpinner
              data-testid={`${testId}-progress-spinner`}
              className="w-2rem h-2rem"
              strokeWidth="7"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        }
      >
        <div className="grid m-0">
          {feeds.map((feed) => (
            <div
              data-testid={`${testId}-feed-card-wrapper`}
              className={`col-12 ${displayFormat.class}`}
              key={feed.id}
            >
              <FeedCard
                testId={`${testId}-feed-card`}
                feed={feed}
                onClick={onFeedCardClick}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
