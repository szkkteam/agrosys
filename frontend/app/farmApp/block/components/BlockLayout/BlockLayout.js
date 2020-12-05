import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    Grid
} from '@material-ui/core';

import {
    BlockViewButtons
} from '../../components'

import { MasterDetail } from 'components'


const StyledMasterDetail = styled(props => <MasterDetail {...props}/>)`
    height: calc(100% - 56px) !important;
`

const StyledBlockViewButtons = styled(props => <BlockViewButtons {...props} />)`
    float: right;
`

const Container = styled(Grid)`
    height: 100%;
`

const SubHeader = styled.div`
    width: 100%;
    height: 56px;
`

const BlockLayout = ({
    history,
    match,
}) => {


    return (
        <Container>
            <SubHeader>
                <StyledBlockViewButtons
                    history={history}
                    match={match}
                />
            </SubHeader>
            <StyledMasterDetail>
                <div>Master</div>
                <div>Detail</div>
            </StyledMasterDetail>                
        </Container>
    )
}

BlockLayout.propTypes = {

}

export default BlockLayout