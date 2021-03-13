import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    PrimaryActionButton
} from 'components'

const TaskAddTreatmentButton = ({

}) => {

    const handleClick = () => {
        // TODO: What kind of treatment modal to show?
    }

    return (
        <PrimaryActionButton
            title={messages.title}
            onClick={handleClick}
        />
    )
}

TaskAddTreatmentButton.propTypes = {

}

export default TaskAddTreatmentButton