export interface DataType {
  data: {
    terms: string;
    query_count: number;
    click_count: number;
  }[];
  total_query_count: number;
  total_click_count: number;
}
