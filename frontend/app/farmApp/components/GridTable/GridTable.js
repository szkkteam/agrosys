import React, { useState, useRef, useLayoutEffect } from 'react'
//import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

//    background-color: rgba(0, 0, 0, 0.04);
const Row = styled.div`
    display: flex;
    align-items: center;
    ${({theme, hoverable=null}) => `
        ${hoverable? `
            cursor: pointer;
            &:hover {
                background-color: rgba(0, 0, 0, 0.04);
            }
        `:
        `
        `}

    `}
`

const Column = styled.div`
    ${({theme, size, spacing}) => `
        flex: ${size || 1 };
        padding: 0 ${theme.spacing(spacing)}px;
    `}
    text-align: left;

`

const Container = styled.div`
    //padding: 20px 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e2e2;
`

const BodyContainer = styled.div`
    overflow-y: auto;
`


const GridTable = ({
    columns,
    data,
    className,
    children,
    onRowClick,
    columnSpacing=1,
    ...props
}) => {
    
    const handleRowClick = (rowData) => (e) => {
        onRowClick && onRowClick(e, rowData)
    }

    return (
        <Container
            className={className}
        >
            <HeaderContainer>
                {columns.map(({title, size = 1, spacing = undefined}, i) => (
                    <Column key={i} size={size} spacing={!_.isUndefined(spacing)? spacing: columnSpacing}>
                        {title}
                    </Column>                    
                ))}
            </HeaderContainer>
            <BodyContainer>
                {data && data.map((row, i) => (
                    <Row key={i} hoverable={onRowClick} onClick={handleRowClick(row, i)}>
                        { columns.map(({size = 1, render = null, spacing = undefined, ...col}, j) => 
                            <Column key={j} size={size} spacing={!_.isUndefined(spacing)? spacing: columnSpacing}>
                                { render? render(row, i) : "Empty" }
                            </Column>
                        )}
                    </Row>
                ))}
            </BodyContainer>
            {children}
        </Container>
    )
}

GridTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]).isRequired,
        render: PropTypes.func,
        size: PropTypes.any,
        spacing: PropTypes.number,
    })).isRequired,
    //data: PropTypes.arrayOf(PropTypes.any).isRequired
    data: PropTypes.any.isRequired
}

export default GridTable