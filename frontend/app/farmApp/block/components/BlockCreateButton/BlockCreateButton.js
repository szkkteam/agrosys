import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import { useInjectReducer, useInjectSaga } from 'utils/hooks'
import { useDispatch } from 'react-redux'
import { showCreateModal } from '../../actions'

import './blockcreatebutton.scss'

const BlockCreateButton = ({
    onClick,
    className='',
}) => {

    useInjectReducer(require('../../reducers/createBlockModalReducer'))
    useInjectSaga(require('../../sagas/createBlockModalSaga'))

    const dispatch = useDispatch()
    

    const handleClick = () => {
        dispatch(showCreateModal())
        onClick()
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
}



export default BlockCreateButton