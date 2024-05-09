export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  body?: any;
  params?: any;
  headers?: B;
}
