import { createSelector } from 'reselect';
import { selectLanguage } from './reducers/language'

/**
 * Select the language locale
 */

export const getSelectedLocale = createSelector(
    selectLanguage,
    languageState => languageState.locale,
)


/**
 * Modal selector
 */
const modalsSelector = state => state.modals
export const getModal = createSelector(
    modalsSelector,
    modals => ({
        modalType: modals.types[0],
        modalProps: modals.props[0],
    })
)

export const isModalActive = createSelector(
    modalsSelector,
    modals => modals.types.length > 0
)


/**
 * Notification selector
 */
const notificationSelector = state => notification
export const isNotificationActive = createSelector(
    notificationSelector,
    notification => notification.notifications.length > 0
)