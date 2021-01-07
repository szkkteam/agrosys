import {
    CHANGE_LOCALE,
} from 'site/actions'
import { DEFAULT_LOCALE, translationMessages } from 'i18n'
import { storage } from 'utils'



const getNavigatorLocal = () => {
    const locale = navigator.language
    /*
    console.debug("Locale: ", locale)
    const splitted = locale.split('-')[0]
    console.log("Locale: ", splitted)
    */
    if (locale in translationMessages) return locale
    else return null
}

export const initialState = {
    locale: storage.getLocale() || getNavigatorLocal() || DEFAULT_LOCALE,
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CHANGE_LOCALE:
            storage.storeLocale(payload.locale)
            return {
                ...state,
                locale: payload.locale
            }

        default:
        return state
    }
}

export const selectLanguage = state => state.locale