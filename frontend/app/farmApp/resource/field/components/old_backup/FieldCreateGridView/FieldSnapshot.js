import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useIntl, FormattedMessage } from 'react-intl'
import { useConvertArea } from 'utils/hooks'

import {
    ListItem,
    Typography,
    Button,
} from '@material-ui/core';

const ListContainer = styled(ListItem)`
    height: 70px;
    width: 100%;
    //border-top: 1px solid rgba(214, 220, 225, 0.5);
    //padding: 10px 20px;
    padding: 0;
    max-width: 250px;
    //cursor: pointer;
`

const ListInnerContainer = styled.div`
    display: flex;
    //min-width: 220px;
    width: 100%;
    align-items: center;
    min-height: 69px;        
`

const Thumbnail = styled.div`
    background-image: url(${props => props.image});
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    background-color: rgba(0,0,0,0.1);
    background-size: cover;
    background-position: 50%;
    backgrind-repeat: no-repeat;
    margin-right: 10px;
`

const Content = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    font-size: 14px;
`

const Title = styled(Typography)`
    position: relative;
    font-size: 1em;
    font-weight: 700;
    margin: 0 25px 3px 0;
`


const FieldSnapshot = ({
    className,
    area,
    children,
    ...props
}) => {
    const convertedArea = useConvertArea(area)

    return (
        <ListContainer
            className={className}
        >
            <ListInnerContainer>
                <Thumbnail image="https://via.placeholder.com/48/48"/>
                <Content>
                    <Title variant="h2" noWrap>
                        {convertedArea}
                    </Title>                                        
                </Content>   
            </ListInnerContainer>
        </ListContainer>
    )
}

FieldSnapshot.propTypes = {

}

export default FieldSnapshot