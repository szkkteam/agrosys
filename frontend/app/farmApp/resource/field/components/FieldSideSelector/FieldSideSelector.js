import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import globalMessages from 'messages'
import styled from 'styled-components'

import { useFetchFields, useSelectFieldsArea, useConvertArea } from '../../hooks'


import {
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    Typography,
    Button,
    Drawer,
} from '@material-ui/core';

import {
    FieldListItem
} from '../../components'

import { 
    MasterList,
    PageContent,
    PageHeader,
    PrimaryActionButton
} from 'components'

import MasterListContext from 'components/List/MasterListContext'
import messages from './messages'

const SelectIcon = styled(ListItemIcon)`
    min-width: 30px;
    margin-right: 10px;
`

const Container = styled(PageContent)`
    width: 270px;
`

const PaddedList = styled(MasterList)`
    padding: 0 16px;
`

const TextContainer = styled.div`
    //padding: 10px 5px;
    padding-bottom: 10px;
`

const Selector = ({    
    disabled,
    selectedField,
    selected: notUsed,
    ...props
}) => {
    //const [selected, setSelected] = useState(false)
    //const handleSelect = () => setSelected(!selected)
    return (
        <FieldListItem
            disableAction={true}
            disabled={disabled}
            {...props}
        >
            <SelectIcon>
                <Checkbox
                    edge="start"
                    disabled={disabled}
                    checked={selectedField}
                    tabIndex={-1}
                    //onClick={handleSelect}
                    disableRipple
                    //inputProps={{ 'aria-labelledby': labelId }}
                /> 
            </SelectIcon>
        </FieldListItem>
    )
}

const FieldSideSelector = ({
    open,
    onClose,
    selected,
    onSelected,
    children,
    ...props
}) => {
    /*
    const [items, setItems] = useState([
        {id: 1, selected: false},
        {id: 2, selected: false},
        {id: 3, selected: false},
        {id: 4, selected: false},
        {id: 5, selected: false},
        {id: 6, selected: false},
    ])
    */
   const { payload, isLoading } = useFetchFields()

    const handleSelected = (id) => {
        const newState = !selected.find(x => x === id)
        onSelected && onSelected(id, newState)
    }

    const result = useSelectFieldsArea(selected)
    console.debug("Result: ", result)
    const { payload: { area } } = useSelectFieldsArea(selected)
    const convertedArea = useConvertArea(area)

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >       
            <Container>
                <PageHeader
                    //noWrap
                    title={messages.title}
                    //subheader={`Selected total area: ${convertedArea}`}
                    subheader={{
                        values: {
                            b: (chunk) => <b>{convertedArea}</b>
                        },
                        ...messages.area
                    }}
                />
                <PaddedList
                    onSelect={handleSelected}
                    isLoading={isLoading}
                    options={{
                        // TODO: Fixme
                        maxHeight: 800,
                    }}
                    style={{flexGrow: 1}}
                    addButton={children}
                >
                    {payload && payload.map((id, i) => (
                        <Selector key={i} id={id} disabled={false} selectedField={!!selected.find(x => x === id)}/>
                    ))}
                </PaddedList>
            </Container>
        </Drawer>
    )
}

FieldSideSelector.propTypes = {

}

export default FieldSideSelector