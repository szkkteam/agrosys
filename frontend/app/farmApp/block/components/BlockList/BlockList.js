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

const Container = styled.div`
    position: relative;
    height: 100%;
`

const ScrollList = styled(List)`
    max-height: 560px;
    overflow-y: auto;
    padding: 0;
    margin: 8px 0;

`

const BlockList = ({
    children,
    addButton,
    ...props
}) => {

    const match = useRouteMatch()
    const history = useHistory()

    return (
        <Container>
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
            {addButton}
        </Container>
    )
}

BlockList.propTypes = {
    addButton: PropTypes.element,
}

export default BlockList