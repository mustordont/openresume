export interface RootState {
  version: string;
  busy: boolean;
  workers: string[];
  error: string|null;
  token: string;
}