import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useModalContext } from '../hooks'

import BackButton from 'components/Button/BackButton'


const BackButton = forwardRef(({
    onBack,
    ...props
}, ref) => {
    const { handleCancel } = useModalContext()
    return (
        <BackButton 
            ref={ref}
            onClick={onBack ?? handleCancel}
            {...props}
        />
    )
})


BackButton.propTypes = {
    onBack: PropTypes.func
}

export default BackButton