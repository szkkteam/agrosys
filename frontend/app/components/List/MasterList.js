import React, { useContext, useRef, useEffect, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from 'react-intl'

import { useHeightDifference } from 'utils/hooks'

import {
    List,
 } from '@material-ui/core';

 import MasterListContext from './MasterListContext'

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const ScrollListContainer = styled.div`
    height: 100%;
`

const ScrollList = styled(forwardRef(({maxHeight: dummy = null, ...rest}, ref) => <List {...rest} ref={ref} /> ))`
    ${({ theme, maxHeight }) => `
    max-height: ${maxHeight}px;
    overflow-y: auto;
    padding: 0;
    margin: 8px 0;
    `}
`


const defaultOptions = {
    maxHeight: 760,
}

const MasterList = ({
    className,
    children,
    addButton,
    options={},
    onSelect,
    ...props
}) => {
    const {
        maxHeight,
    } = {...defaultOptions, ...options}

    const buttonRef = useRef(null)
    const listRef = useRef(null)
    const [selected, setSelected] = useState(null)

    //const height = useHeightDifference(listRef, buttonRef || 0, maxHeight)
    const height = maxHeight
    
    // TODO: Do we really need match and history?
    // TODO: Implement a onClick global handler
    const match = useRouteMatch()
    const history = useHistory()

    const handleSelect = (index, data = null) => {
        setSelected(index)
        onSelect && onSelect(data)
    }

    const contextObject = {
        onSelect: handleSelect,
    }

    return (
        <Container
            className={className}
            {...props}
        >
            <MasterListContext.Provider
                value={contextObject}
            >
                <ScrollList
                    ref={listRef}
                    maxHeight={height}
                    component="ul"
                >
                    { React.Children.map(children, (
                        (child, i) => {
                            return (
                                React.cloneElement(child, {
                                    selected: selected != null && selected === i,
                                    index: i,
                                    match,
                                    history
                                })
                            )
                        }
                    ))}
                </ScrollList>
                { addButton && React.cloneElement(addButton, { ref: buttonRef }) }
            </MasterListContext.Provider>
        </Container>
    )
}

MasterList.propTypes = {
    addButton: PropTypes.element,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    options: PropTypes.shape({
        maxHeight: PropTypes.number,
    })
}

export default MasterList