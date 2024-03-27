export type WikipediaFeaturedContentDto = {
  tfa: {
    type: string;
    titles: {
      canonical: string;
      normalized: string;
      display: string;
    };
    pageid: number;
    thumbnail: {
      source: string;
      width: number;
      height: number;
    };
    lang: string;
    timestamp: string;
    description: string;
    description_source: string;
    content_urls: {
      desktop: {
        page: string;
      };
      mobile: {
        page: string;
      };
    };
    extract: string;
    extract_html: string;
  };
};
