import { MODAL_ACTIONS } from '../constants';

export const createChangeModal = (payload: {isOpen: boolean, modalType: string}) => ({ type: MODAL_ACTIONS.CHANGE_MODAL, payload });
