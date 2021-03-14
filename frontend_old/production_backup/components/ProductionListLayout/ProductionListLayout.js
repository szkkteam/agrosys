import React from 'react'
import Grid from '@material-ui/core/Grid';
import './productionlistlayout.scss'

import {
    ListLayout,
    ListElementLong,
} from 'components'

import {
    ListElement,
    ListCreate,
} from 'production/components'

export default ({items, Component, ...rest}) => {
    return(
        <ListLayout 
            items={items}
            ListItem={ListElement}
            CreateItem={ListCreate}
            Component={ListElementLong}
            //listItemProps
            //createItemProps
        />        
    )
}
