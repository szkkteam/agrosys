import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'

import { pushModalWindow } from 'redux-promising-modals';
import { BLOCK_CREATE_DIALOG } from 'site/modalTypes'

import Button from '@material-ui/core/Button';

import './blockcreatebutton.scss'

const BlockCreateButton = ({
    onClick,
    className='',
    pushModalWindow,
}) => {

    const handleClick = () => {
        onClick && onClick()
        pushModalWindow(BLOCK_CREATE_DIALOG, {})
        .then((status) => {
            // Be carefull here: status is undefined, if the user clicks to one of the button.
            // We are not waiting for the result, because the modal window will perform the route change
        })
    }

    return (
        <Button
            className={classnames(className, {

            })}
            variant="contained"
            color="primary"
            onClick={handleClick}
        >
            <FormattedMessage {...messages.title} />
        </Button>
    )
}

BlockCreateButton.propTypes = {
    onClick: PropTypes.func,
    pushModalWindow: PropTypes.func.isRequired,
    className: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
    }
  }

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
)
  
export default compose(
    withConnect,
)(BlockCreateButton)
