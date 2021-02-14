import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    MasterList,
    DataLoading
} from 'components'

import { useFetchFields } from '../../hooks'

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

    const { payload, isLoading } = useFetchFields()

    return (
        <MasterList
            isLoading={isLoading}
            options={{
                maxHeight: 570,
            }}
            addButton={
                <BottomButton
                />
            }
            {...props}
        >
            {payload && payload.map((id, i) => (
                <BorderFieldListItem key={i} id={id}/>
            ))}
            
        </MasterList>
    )
}
/*
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
*/

FieldMasterList.propTypes = {

}

export default FieldMasterList