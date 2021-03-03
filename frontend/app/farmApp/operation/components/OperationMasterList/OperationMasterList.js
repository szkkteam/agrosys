import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    MasterList,
    DataLoading
} from 'components'

import {
    Button
} from '@material-ui/core'

import OperationAddButton from '../OperationAddButton/OperationAddButton'
import OperationListItem from '../OperationListItem/OperationListItem'

const OperationMasterList = ({
    ...props
}) => {

    return (
        <MasterList
            options={{
                maxHeight: 570,
            }}
            addButton={
                <OperationAddButton
                />
            }
            {...props}
        >
            <OperationListItem />
            <OperationListItem />
            <OperationListItem />
            <OperationListItem />
            
        </MasterList>
    )
}

OperationMasterList.propTypes = {

}

export default OperationMasterList