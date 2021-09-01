import { Feedback } from './feedback.interface';

export interface ServiceResponse<T> {
  content: T | any;
  feedback: Feedback;
}
