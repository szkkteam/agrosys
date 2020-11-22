import {
    CHANGE_LOCALE,
} from 'site/actions'
import { DEFAULT_LOCALE, translationMessages } from 'i18n'



const getNavigatorLocal = () => {
    const locale = navigator.language
    const splitted = locale.split('-')[0]
    console.log("Locale: ", splitted)
    if (splitted in translationMessages) return splitted
    else return null
}

export const initialState = {
    locale: getNavigatorLocal() || DEFAULT_LOCALE,
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CHANGE_LOCALE:
        return {
            ...state,
            locale: payload.locale
        }

        default:
        return state
    }
}

export const selectLanguage = state => state.locale