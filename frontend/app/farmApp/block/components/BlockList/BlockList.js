import React, { useContext, useRef, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from 'react-intl'

import {
    List,
    ListSubheader
 } from '@material-ui/core';

 import {
    BlockCreateButton,
} from '../../components'

const Container = styled.div`
    position: relative;
    height: 100%;
`

const ScrollList = styled(List)`
    max-height: 660px;
    overflow-y: auto;
    padding: 0;
    margin: 8px 0;

`


const BottomButton = styled(props => <BlockCreateButton {...props} />)`
    position: absolute;
    margin-bottom: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
`

const BlockList = ({
    children,
    ...props
}) => {

    const match = useRouteMatch()
    const history = useHistory()

    return (
        <Container>
            <ListSubheader component="div" id="nested-list-subheader">
                Fields list
            </ListSubheader>
            <ScrollList
                component="ul"
            >
                { React.Children.map(children, (
                    child => {
                        return (
                            React.cloneElement(child, {
                                match,
                                history
                            })
                        )
                    }
                ))}
            </ScrollList>
            <BottomButton />
        </Container>
    )
}

BlockList.propTypes = {

}

export default BlockList