import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useIntl, FormattedMessage } from 'react-intl'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ItemMenu } from 'components'
import MasterListItem from 'components/List/MasterListItem'

import {
    ListItem,
    Typography,
    IconButton
} from '@material-ui/core';

import { useSelectField, useConvertArea } from '../../hooks'

const ListContainer = styled(MasterListItem)`
    height: 70px;
    width: 100%;
    //border-top: 1px solid rgba(214, 220, 225, 0.5);
    padding: 10px 0px;
    //max-width: 250px;
    //min-width: 220px;
    
    cursor: pointer;
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
    id,
    //payload,
    children,
    className,
    disableAction=false,
    ...props
}) => {
    //console.debug("FieldListItem - data: ", data)
    const items = [
        {title: messages.edit, link: { to: ROUTES.ResourceFieldEdit, params: {id: 1}}},
        //{title: messages.edit, onClink: null},
        {title: messages.delete, onClink: null}
    ]

    const { payload, isLoading } = useSelectField(id)

    const { 
        title,
        area: areaM2,
        lpis,
    } = payload || {}

    const { meparId } = lpis || {}

    const area = useConvertArea(areaM2)

    return (
        <ListContainer
            data={id}
            className={className}
            {...props}
        >
            {children}
            <ListInnerContainer>
                <Thumbnail image="https://via.placeholder.com/48/48"/>
                <Content>
                    <Title variant="h2" noWrap>
                        {`${title}, ${area}`}
                    </Title>                    
                    <MetaContainer>
                        <LpisMeta>
                            <Typography variant="caption" >
                                ({meparId})
                            </Typography>
                        </LpisMeta>
                        <Utilization>
                            50%
                        </Utilization>
                    </MetaContainer>
                </Content>                
                { !disableAction && <ActionIcon
                    items={items}
                /> }
            </ListInnerContainer>
        </ListContainer>
    )
}

FieldListItem.propTypes = {

}

export default FieldListItem