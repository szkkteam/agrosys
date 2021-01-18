import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { ModalFooter } from 'components'
import { useModalContext } from 'components/Modal/hooks'
import PrimaryButton from 'components/Modal/components/PrimaryButton'

const StepperFooter = ({
    ...props
}) => {
    
    return (
        <ModalFooter>
            <PrimaryButton
                {...props}
                type="submit"
            />
        </ModalFooter>
    )
}

StepperFooter.propTypes = {

}

export default StepperFooter