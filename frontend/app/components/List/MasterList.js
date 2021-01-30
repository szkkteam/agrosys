import React, { useContext, useRef, useEffect, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from 'react-intl'
import sizeMe, { SizeMe } from 'react-sizeme'

import { PrimaryActionButton } from 'components'

import {
    List,
 } from '@material-ui/core';

 import MasterListContext from './MasterListContext'

const bottomPadding = 10

const Container = styled.div`
    position: relative;
    height: calc(100% - ${bottomPadding}px);
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ScrollList = styled(props => <List {...props} /> )`
    overflow-y: auto;
    padding: 0;
    margin: 8px 0;
    flex-grow: 1;
`


const MasterList = ({
    className,
    children,
    addButton,
    buttonProps=null,
    onSelect,
    ...props
}) => {
    const [selected, setSelected] = useState(null)

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
                    component="ul"
                >
                    { React.Children.map(children, (
                        (child, i) => {
                            return (
                                React.cloneElement(child, {
                                    selected: selected != null && selected === i,
                                    index: i,
                                })
                            )
                        }
                    ))}
                </ScrollList>
                { addButton }

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