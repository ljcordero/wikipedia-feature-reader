import { HttpClientService } from "./http-client-service";

export type GetWikipediaFeedRequestDto = {
  language: string;
  date: Date;
};

export type GetWikipediaFeedResponseDto = {
  feed: WikipediaFeedResponseDto | null;
  date: Date;
  language: string;
};

export type WikipediaFeedResponseDto = {
  id: number;
  title: string;
  type: string;
  thumbnail?: string;
  description: string;
  extract: string;
  url: string;
  lastEditedDate: string;
};

const WIKIPEDIA_FEED_PATH = "feed/translate";

export class WikipediaService {
  constructor(private requestServer: HttpClientService) {}

  public async getFeed(
    dto: GetWikipediaFeedRequestDto,
  ): Promise<GetWikipediaFeedResponseDto> {
    try {
      const response = await this.requestServer.get<{
        data: WikipediaFeedResponseDto | null;
      }>(`${WIKIPEDIA_FEED_PATH}/${dto.language}`, {
        date: dto.date.toISOString().split("T")[0],
      });
      return {
        feed: response.data,
        date: dto.date,
        language: dto.language,
      };
    } catch (error) {
      throw error;
    }
  }
}
