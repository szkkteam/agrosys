import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useParams, useHistory } from 'react-router-dom'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

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


const groupBy = (list, keyGetter) => {
    const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
}


const OrderMasterList = ({
    ...props
}) => {
    const { id } = useParams()
    const history = useHistory()

    const statusTypes = [
        {id: 'inProgress', title: globalMessages.inProgress},
        {id: 'paused', title: globalMessages.paused},
        {id: 'notStarted', title: globalMessages.notStarted},
    ]

    const data = [

        { id: 1, title: "Tárcsázás", fieldTitle: 'Tábla 1', area: 12, status: 'inProgress'},
        { id: 2, title: "Tárcsázás", fieldTitle: 'Tábla 2', area: 27, status: 'paused'},
        { id: 3, title: "Ültetés", fieldTitle: 'Tábla 1', area: 12, status: 'notStarted'},
        { id: 4, title: "Aratás", fieldTitle: 'Tábla 1', area: 12, status: 'notStarted'},
    ]

    const grouped = groupBy(data, x => x.status)


    const handleSelect = (id) => {
        const route = ROUTE_MAP[ROUTES.TaskTable].toPath({id})
        history.push({
            pathname: route
        })
    }

    return (
        <MasterList
            onSelect={handleSelect}
            listProps={{
                subheader: <li/>
            }}
            {...props}
        >
                {statusTypes.map(({id: type, title}) => (
                    <PinnedLi key={`group-${type}`}>
                        <PinnedUl component='ul'>
                            <ListSubheader>
                                <FormattedMessage {...title} />
                            </ListSubheader>
                                {grouped.get(type).map(({id: taskId, ...data}, i) => (
                                    <OrderListItem key={i} 
                                        selected={taskId === parseInt(id)}
                                        id={taskId}
                                        data={data}
                                    />
                                ))}
                        </PinnedUl>
                    </PinnedLi>
                ))}
            
        </MasterList>
    )
}

OrderMasterList.propTypes = {

}

export default OrderMasterList