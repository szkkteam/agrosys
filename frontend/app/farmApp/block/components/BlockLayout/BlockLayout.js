import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { HeaderContentContext } from 'components'

import {
    Grid,
    Portal
} from '@material-ui/core';

import {
    BlockViewButtons,
    BlockList,
    BlockListItem
} from '../../components'

import { LeafletMap } from 'farmApp/map/components'

import { MasterDetail } from 'components'


const StyledBlockViewButtons = styled(props => <BlockViewButtons {...props} />)`
    float: right;
`

const Container = styled(Grid)`
    height: 100%;
    display: flex;
`

const BlockLayout = ({
    history,
    match,
}) => {

    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    // TODO: Based on the URL query param, change the view later

    return (
        <Container>
            <Portal container={headerPortalRef.current}>
                <StyledBlockViewButtons
                    history={history}
                    match={match}
                />
            </Portal>
            <MasterDetail>
                <BlockList>
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                    <BlockListItem />
                </BlockList>
                <LeafletMap />
            </MasterDetail>                
        </Container>
    )
}

BlockLayout.propTypes = {

}

export default BlockLayout