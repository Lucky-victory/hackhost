export type StateStatus = "loading" | "error" | "pending";
export type APIResponse<T> = {
  data: T | null;
  status: number;
  message?: string;
};
