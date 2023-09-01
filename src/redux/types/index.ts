import {
  AuthResponse,
  AuthUser,
  CompletePost,
  CompleteUser,
  User
} from '../../types';

export interface PostsState {
  news: CompletePost[] | null | undefined;
  isLoading: boolean;
  error: null | string | undefined;
}

export interface PostAction {
  type: string;
  payload?: CompletePost[];
  error?: string;
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
  authUser: User | null | undefined;
  isAuthLoading: boolean;
  authError: null | string | undefined;
}

export interface AuthAction {
  type: string;
  payload: AuthResponse | AuthUser;
  error?: string;
}

export interface modalPayload {
  isOpen: boolean;
  modalType: string;
}

export interface UserState {
  user: CompleteUser | null;
  isUserFetching: boolean;
  userError: string;
}

export interface UserAction {
  type: string;
  payload?: number | CompleteUser;
  error?: string;
}
