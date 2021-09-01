export interface Feedback {
  title: string;
  message: string;
  severity: 'success' | 'error';
  allOk: boolean;
}
