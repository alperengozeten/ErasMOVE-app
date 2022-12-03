import { SEND_REPLACEMENT_OFFER_REQUEST } from "../constants/actionTypes";

export const sendReplacementOffer = id => 
    ({
        type: SEND_REPLACEMENT_OFFER_REQUEST,
        payload: { id },
    });
