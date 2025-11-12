export type Sort = {
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  categoryID: number;
  currentPage: number;
  searchValue: string;
  activeSort: Sort;
}

export interface Parse {
  category?: string;
  page?: string;
  sortBy?: Sort;
}
