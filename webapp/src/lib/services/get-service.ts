import { HttpClientService } from "./http-client-service";

type Constructor<T> = new (...args: any[]) => T;

/**
 * The function `getService` creates a new instance of a service class by passing an instance of
 * `FetchService` as a parameter.
 * @param service - The `service` parameter is a constructor function that represents a service class.
 * It is used to create an instance of the service class.
 * @returns a new instance of the provided service class, with an instance of the FetchService class as
 * a parameter.
 */
export const getService = <T>(service: Constructor<T>): T => {
  return new service(new HttpClientService());
};
