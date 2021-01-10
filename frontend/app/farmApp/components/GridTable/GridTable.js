import React, { useState, useRef, useLayoutEffect } from 'react'
//import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'


const Row = styled.div`
    display: flex;
    align-items: center;
`

const Column = styled.div`
    ${({theme, size, spacing}) => `
        flex: ${size || 1 };
        padding: 0 ${theme.spacing(spacing)}px;
    `}
    text-align: left;

`

const Container = styled.div`
    padding: 20px 5px;
    //display: flex;
    //align-items: center;
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e2e2;
`

const BodyContainer = styled.div`
    //display: flex;
    //align-items: center;
`


const GridTable = ({
    columns,
    data,
    className,
    children,
    columnSpacing=1,
    ...props
}) => {
    
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
                {data.map((data, i) => (
                    <Row>
                        { columns.map(({size = 1, render = null, spacing = undefined, ...col}, i) => 
                            <Column key={i} size={size} spacing={!_.isUndefined(spacing)? spacing: columnSpacing}>
                                { render? render(data) : "Empty" }
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
        title: PropTypes.oneOf([
            PropTypes.string,
            PropTypes.object,
        ]).isRequired,
        render: PropTypes.func,
        size: PropTypes.number,
        spacing: PropTypes.number,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default GridTable