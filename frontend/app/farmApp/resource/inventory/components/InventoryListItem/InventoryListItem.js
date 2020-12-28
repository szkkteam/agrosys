import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { ItemMenu } from 'components'

import {
    Typography,
    ListItem,
    Collapse,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';

import {
    InventoryFillProgress
} from '..'

const InnerList = styled.div`
    padding-left: 20px;
`

const ListContainer = styled(ListItem)`
    height: 70px;
    width: 100%;
    //border-top: 1px solid rgba(214, 220, 225, 0.8);
    //border-top: 1px solid black;
    padding: 0;
    cursor: pointer;
    > div {
        padding: 10px 5px;
        display: flex;
        width: 100%;
        align-items: center;
        min-height: 69px;        
    }
`

const ArrowIconButton = styled(ListItemIcon)`
    min-width: 30px;
    padding-right: 10px;
    > svg {
        font-size: 2.0rem;
    }
`

const Content = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    font-size: 14px;
    ${({paddingLeft}) => paddingLeft && `
        padding-left: 42px;
    `}
`


const Title = styled(Typography)`
    position: relative;
    font-size: 1em;
    font-weight: 700;
    margin: 0 25px 7px 0;
`


const MetaContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-left: -10px;
`

const ProgressBar = styled(InventoryFillProgress)`
    width: 100%;
`


const ActionIcon = styled(props => <ItemMenu {...props}/>)`
    position: absolute;
    right: 5px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    //padding: 10px 0;
    top: 3px;
    display: none;
    ${ListContainer}:hover & {
        display: block;
    }
`

const InventoryListItem = ({
    title,
    children
}) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open);
    }

     
    const items = [
        {title: messages.edit, onClink: null},
        {title: messages.delete, onClink: null}
    ]

    const hasChildren = React.Children.count(children)

    return (
        <>
            <ListContainer
                //button
            >
                <div>
                    { hasChildren ?
                    <ArrowIconButton
                        onClick={handleClick}
                    >
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ArrowIconButton>
                    : null}   
                    <Content paddingLeft={!hasChildren}>
                        <Title variant="h2" noWrap>
                            {title}
                        </Title>  
                        <MetaContainer>
                            <ProgressBar current={50} max={100} unit="liter"/>
                        </MetaContainer>
                        <ActionIcon
                            items={items}
                        />
                    </Content>
                </div>
                
            </ListContainer>
            { hasChildren ? <Collapse in={open} timeout="auto" unmountOnExit>
                <InnerList>
                    {children}
                </InnerList>
            </Collapse> : null }
        </>
    )
}

/*
{ hasChildren ?
                <ArrowIconButton
                    onClick={handleClick}
                >
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ArrowIconButton>
            : null}            
            <ListItemText primary="Warehouse" />
            <InventoryFillProgress current={50} max={100}/>
*/

InventoryListItem.propTypes = {

}

export default InventoryListItem