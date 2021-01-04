import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Grid
} from '@material-ui/core'

import {
    DashboardAddWidget
} from '../../components'

import {
    TableHeader
} from 'components/Table'

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const DashboardHeader = ({
    widgets,
    onAdd,
    ...props
}) => {
    return (
        <TableHeader
            title={messages.title}
        >   
            <Grid
                container
                justify="flex-end"
            >
                <FlexGrid item xs={9}>
                    <Spacer />
                    <DashboardAddWidget
                        items={widgets}
                        onAdd={onAdd}
                    />
                </FlexGrid>
                <FlexGrid item xs={3}>      
                    <Spacer />
                    
                </FlexGrid>
            </Grid>
        </TableHeader>
    )
}

DashboardHeader.propTypes = {

}

export default DashboardHeader