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
    ListSubheader,
    Paper
} from '@material-ui/core'

//import TaskAddButton from '../TaskAddButton/TaskAddButton'
import OrderListItem from '../OrderListItem/OrderListItem'


const PinnedUl = styled(Paper)`
    background-color: inherit;
    padding: 0;
`

const PinnedLi = styled.li`
    background-color: inherit;
`

const OrderMasterList = ({
    ...props
}) => {


    const handleSelect = (id) => {
        
    }

    return (
        <MasterList
            onSelect={handleSelect}
            listProps={{
                subheader: <li/>
            }}
            {...props}
        >
                {['In progress', 'Paused', 'Not started',].map((type) => (
                    <PinnedLi key={`group-${type}`}>
                        <PinnedUl component='ul'>
                            <ListSubheader>{type}</ListSubheader>
                                <OrderListItem />
                                <OrderListItem />
                        </PinnedUl>
                    </PinnedLi>
                ))}
            
        </MasterList>
    )
}

OrderMasterList.propTypes = {

}

export default OrderMasterList