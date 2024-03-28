import { API_CONFIG } from "@/constants";

export class HttpClientService {
  async get<R>(url: string, params?: any): Promise<R> {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/${url}?${new URLSearchParams(params).toString()}`,
      {
        method: "GET",
        headers: API_CONFIG.headers,
      },
    );
    return response.json() as Promise<R>;
  }

  async post<R>(url: string, body: any, params?: any): Promise<R> {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/${url}?${new URLSearchParams(params).toString()}`,
      {
        method: "POST",
        headers: API_CONFIG.headers,
        body,
      },
    );
    return response.json() as Promise<R>;
  }

  async put<R>(url: string, body: any, params?: any): Promise<R> {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/${url}?${new URLSearchParams(params).toString()}`,
      {
        method: "PUT",
        headers: API_CONFIG.headers,
        body,
      },
    );
    return response.json() as Promise<R>;
  }

  async delete<R>(url: string): Promise<R> {
    const response = await fetch(`${API_CONFIG.baseUrl}/${url}`, {
      method: "DELETE",
      headers: API_CONFIG.headers,
    });
    return response.json() as Promise<R>;
  }
}
