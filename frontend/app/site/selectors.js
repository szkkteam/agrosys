import { createSelector } from 'reselect';
import { selectLanguage } from './reducers/language'

/**
 * Select the language locale
 */

export const getSelectedLocale = createSelector(
    selectLanguage,
    languageState => languageState.locale,
)
