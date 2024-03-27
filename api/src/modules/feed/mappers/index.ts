import { WikipediaFeaturedContentDto } from '../../../modules/wikipedia/dtos/wikipedia-featured-content.dto';
import { FeedResponseDto } from '../dtos/feed-response.dto';

export default class Mappers {
  static wikipediaFeaturedContentDtoToFeedResponseDto(
    dto: WikipediaFeaturedContentDto,
  ): FeedResponseDto {
    const feedResponseDto: FeedResponseDto = new FeedResponseDto();
    feedResponseDto.id = dto.tfa.pageid;
    feedResponseDto.title = dto.tfa.titles.normalized;
    feedResponseDto.type = dto.tfa.type;
    feedResponseDto.description = dto.tfa.description;
    feedResponseDto.extract = dto.tfa.extract;
    feedResponseDto.thumbnail = dto.tfa.thumbnail?.source;
    feedResponseDto.url = dto.tfa.content_urls.desktop.page;
    feedResponseDto.lastEditedDate = dto.tfa.timestamp;

    return feedResponseDto;
  }
}
