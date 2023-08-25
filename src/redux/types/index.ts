import { CompletePost, User } from '../../types';

export interface PostsState {
  news: CompletePost[] | null | undefined,
  isLoading: boolean,
  error: null | string | undefined,
}

export interface PostAction {
  type: string,
  payload?: CompletePost[],
  error?: string,
}

export interface ModalState {
  isOpen: boolean,
  modalType: string
}

export interface ModalAction {
  type: string
  payload: {
    isOpen: boolean,
    modalType: string
  }
}

export interface AuthState {
  authUser: User | null | undefined,
  isAuthLoading: boolean,
  authError: null | string | undefined,
}

export interface AuthAction {
  type: string,
  payload?: User,
  error?: string,
}
