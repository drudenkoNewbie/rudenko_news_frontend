import { CompletePost } from '../../../types';

export interface PostContainerProps {
  posts: CompletePost[];
  isSelfDisplayed: boolean;
}

export interface filterParams {
  currentFilter: string;
  currentSearch: string;
  posts: CompletePost[];
}
