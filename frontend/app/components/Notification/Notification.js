import React from 'react';
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack';
import { bindActionCreators } from 'redux'
import { removeNotification } from 'site/actions';

let displayed = [];

const Notification = ({
    notifications,
    removeNotification,
}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    removeNotification(myKey);
                    removeDisplayed(myKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar]);

    return null;
};


export default connect(
    (state) => ({ ...state.notification }),
    (dispatch) => bindActionCreators({ removeNotification }, dispatch),
  )(Notification)
