import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    MasterList,
} from 'components'

import FieldCreateButton from '../FieldCreateButton/FieldCreateButton'
import FieldListItem from '../FieldListItem/FieldListItem'

const BottomButton = styled(forwardRef((props, ref) => <FieldCreateButton {...props} ref={ref} /> ))`
    position: absolute;
    margin-bottom: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
`

const BorderFieldListItem = styled(props => <FieldListItem {...props} />)`
    border-top: 1px solid rgba(214, 220, 225, 0.5);
    padding: 10px 20px;
    min-width: 220px;
`

const FieldMasterList = ({
    ...props
}) => {

    return (
        <MasterList
            options={{
                maxHeight: 570,
            }}
            addButton={
                <BottomButton
                />
            }
            {...props}
        >
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
            <BorderFieldListItem />
        </MasterList>
    )
}

FieldMasterList.propTypes = {

}

export default FieldMasterList