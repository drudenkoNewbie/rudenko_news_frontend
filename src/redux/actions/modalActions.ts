import { MODAL_ACTIONS } from '../constants';
import { modalPayload } from '../types';

export const createChangeModal = (payload: modalPayload) => ({ type: MODAL_ACTIONS.CHANGE_MODAL, payload });
