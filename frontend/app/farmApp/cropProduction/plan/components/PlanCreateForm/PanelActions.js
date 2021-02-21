import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import {
    Button
} from '@material-ui/core'

const Spacer = styled.div`
    flex-grow: 1;
`

const PanelActions = ({
    onDelete,
    onEdit,
}) => {
    
    return (
        <>
            <Button
                //size="small"
                color="secondary"
                onClick={onDelete}
            >
                <FormattedMessage {...globalMessages.delete} />
            </Button>
            <Spacer />
            <Button
                //size="small"
                color="primary"
                onClick={onEdit}
            >
                <FormattedMessage {...globalMessages.edit} />
            </Button>
        </>
    )
}

PanelActions.propTypes = {

}

export default PanelActions