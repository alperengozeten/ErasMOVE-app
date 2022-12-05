// project imports
import config from '../config';
import { MENU_OPEN, SET_BORDER_RADIUS, SET_CHAT, SET_FONT_FAMILY, SET_MENU } from '../constants/actionTypes';

// action - state management


export const initialState = {
    isOpen: [], // for active default menu
    isChatOpen: [],
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id],
            };
        case SET_MENU:
            return {
                ...state,
                opened: action.opened,
            };
        case SET_CHAT:
            return {
                ...state,
                chatOpened: action.chatOpened,
            };
        case SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily,
            };
        case SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius,
            };
        default:
            return state;
    }
};

export default customizationReducer;
