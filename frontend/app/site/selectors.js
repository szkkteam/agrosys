import { createSelector } from 'reselect';
import { selectLanguage } from './reducers/language'

/**
 * Select the language locale
 */

export const getSelectedLocale = createSelector(
    selectLanguage,
    languageState => languageState.locale,
)


const modalsSelector = state => state.modals
/**
 * Modal selector
 */
export const getModal = createSelector(
    modalsSelector,
    modals => ({
        modalType: modals.types[0],
        modalProps: modals.props[0],
    })
)