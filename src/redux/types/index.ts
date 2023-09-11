import { CompletePost, CompleteUser, User } from '../../types';

export interface PostsState {
  news: CompletePost[] | null | undefined;
  isLoading: boolean;
  error: null | string | undefined;
}

export interface ModalState {
  isOpen: boolean;
  modalType: string;
}

export interface ModalAction {
  type: string;
  payload: {
    isOpen: boolean;
    modalType: string;
  };
}

export interface AuthState {
  authUser: User | null;
  isAuthLoading: boolean;
  authError: null | string;
}

export interface modalPayload {
  isOpen: boolean;
  modalType: string;
}

export interface UserState {
  user: CompleteUser | null;
  isUserFetching: boolean;
  isEditUserFetching: boolean;
  isAddPostFetching: boolean;
  userError: null | string;
}

export interface EditUserPayload {
  userData: {
    username: string;
    email: string;
    password: string;
  };
  id: number;
}

export interface AddPostPayload {
  title: string;
  content: string;
  tagValues: string[];
}
