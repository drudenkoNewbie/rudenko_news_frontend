import { MODAL_ACTIONS } from '../constants';
import { ModalAction, ModalState } from '../types';

const initialState: ModalState = {  isOpen: false, modalType: 'signup' };

export default function modalReducer(state = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case MODAL_ACTIONS.CHANGE_MODAL:
      return {
        isOpen: action.payload.isOpen,
        modalType: action.payload.modalType
      };
    default: return state;
  }
}
