import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'routes'
import { useIntl, FormattedMessage } from 'react-intl'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ItemMenu } from 'components'

import {
    ListItem,
    Typography,
    IconButton
} from '@material-ui/core';

const ListContainer = styled(ListItem)`
    height: 70px;
    width: 100%;
    border-top: 1px solid rgba(214, 220, 225, 0.5);
    padding: 0;
    cursor: pointer;
    > div {
        padding: 10px 20px;
        display: flex;
        width: 100%;
        align-items: center;
        min-height: 69px;        
    }
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

const MetaContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -10px;
`

const LpisMeta = styled.div`
    flex: 1 1 auto;
    position: relative;
    margin-left: 10px;
`

const Utilization = styled.div`
    font-size: 12px;
    font-weight: 500;
    flex: 0 0 auto;
    white-space: nowrap;
    margin-top: 1px;
`

const ActionIcon = styled(props => <ItemMenu {...props}/>)`
    position: absolute;
    right: 24px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    //padding: 10px 0;
    top: 5px;
    display: none;
    ${ListContainer}:hover & {
        display: block;
    }
`

const FieldListItem = ({
    match,
    history
}) => {

    const id = 1

    const onSelect = (e) => {
        
    }
     
    const items = [
        {title: messages.edit, link: { to: ROUTES.BlockDetail, params: {id: 1}}},
        {title: messages.delete, onClink: null}
    ]

    return (
        <ListContainer
            //button
            onClick={onSelect}            
        >
            <div>
                <Thumbnail image="https://via.placeholder.com/48/48"/>
                <Content>
                    <Title variant="h2" noWrap>
                        Parcel 1, 2.1ha
                    </Title>                    
                    <MetaContainer>
                        <LpisMeta>
                            <Typography variant="caption" >
                                (Field 1, 3.3ha)
                            </Typography>
                        </LpisMeta>
                        <Utilization>
                            50%
                        </Utilization>
                    </MetaContainer>
                </Content>                
                <ActionIcon
                    items={items}
                />
            </div>
        </ListContainer>
    )
}

FieldListItem.propTypes = {

}

export default FieldListItem