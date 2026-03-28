export interface Category {
  id: string;
  name: string;
}

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}
