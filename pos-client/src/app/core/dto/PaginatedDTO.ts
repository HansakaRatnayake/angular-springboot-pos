export interface PaginatedDTO<T> {
  count: number;
  dataList: Array<T>;
}
