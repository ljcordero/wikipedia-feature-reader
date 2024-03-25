import { Injectable } from '@nestjs/common';

export type ApiInformation = {
  name: string;
  description: string;
  version: string;
};

export const API_INFORMATION_DATA: ApiInformation = {
  name: 'wikipedia-feature-reader-api',
  description: 'API for the wikipedia feature reader',
  version: '0.0.1',
};

@Injectable()
export class AppService {
  getApiInformation(): ApiInformation {
    return API_INFORMATION_DATA;
  }
}
