import React from 'react'
import { FormattedMessage } from 'react-intl';
import messages from 'farmApp/tutorial/messages';

import { compose } from 'redux'
import { connect } from 'react-redux'

import { injectReducer } from 'utils/async'

import { getTutorialPercentage } from '../../selectors'

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withReducers } from '../../utils'

import './tutorialprogressbar.scss'

import { enqueueNotification, closeNotification } from 'site/actions'
import { bindActionCreators } from 'redux'
import { useSnackbar } from 'notistack';

import { EDIT_FILE_DIALOG } from 'site/modalTypes'
import { pushModalWindow } from 'redux-promising-modals';

const TutorialProgressBar = ({
    percentage,
    enqueueNotification,
    closeNotification,
    pushModalWindow,
    ...props
}) => {

    const handleClick = () => {
      enqueueNotification({
        message: 'Well done.',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
            action: key => (
                <Button variant="contained" color="secondary" onClick={() => closeNotification(key)}>Close</Button>
            ),
        },
    })
    pushModalWindow(EDIT_FILE_DIALOG, { title: 'Random title'}).then(({ status}) => {
        console.log("Modal exited.")
    })
    }

    console.log("messages.tutorialProgress: ", messages.tutorialProgress)
    return (
        <Button variant="contained" onClick={handleClick}>
            <div className="tutorial-progress">
                <Typography variant="body1" className="title">
                    <FormattedMessage {...messages.tutorialProgress} />
                </Typography>
                <LinearProgress 
                    className="bar"
                    variant="determinate"
                    value={percentage}
                    classes={{
                        barColorPrimary: 'bar-color'
                    }}
                />
                <Typography variant="body2">
                    {`${percentage}%`}
                </Typography>

                </div>
        </Button>
    )
}

const mapStateToProps = (state) => {
  const percentage = getTutorialPercentage(state)
  return {
    percentage,
  }
}


const withConnect = connect(
  mapStateToProps,
  (dispatch) => bindActionCreators({ enqueueNotification, closeNotification, pushModalWindow }, dispatch),
)


export default compose(
  ...withReducers,
  withConnect,
)(TutorialProgressBar)