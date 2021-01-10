import React, { useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import globalMessages from 'messages'
import styled from 'styled-components'

import { updateObjectInArray } from 'utils'

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
    BlockListItem
} from 'farmApp/resource/block/components'

import { 
    MasterList,
    PrimaryActionButton
} from 'components'

import MasterListContext from 'components/List/MasterListContext'

const SelectIcon = styled(ListItemIcon)`
    min-width: 30px;
    margin-right: 10px;
`

const Container = styled.div`
    height: 100%;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
`

const TextContainer = styled.div`
    //padding: 10px 5px;
    padding-bottom: 10px;
`

const SaveButton = styled(Button)`
    width: 100%;
    padding: 5px 5px;
`

const Content = () => <div>Content</div>

const Selector = ({
    id,
    selected,
}) => {
    //const [selected, setSelected] = useState(false)
    //const handleSelect = () => setSelected(!selected)

    return (
        <FieldListItem
            data={{id}}
            disableAction={true}
        >
            <SelectIcon>
                <Checkbox
                    edge="start"
                    checked={selected}
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
}) => {
    const containerRef = useRef(null)
    const [height, setHeight] = useState(800)

    const [items, setItems] = useState([
        {id: 1, selected: false},
        {id: 2, selected: false},
        {id: 3, selected: false},
        {id: 4, selected: false},
        {id: 5, selected: false},
        {id: 6, selected: false},
    ])

    const handleSelected = (item) => {
        const index = _.findIndex(items, {id: item.id})
        const { selected } = items[index]       
        setItems(updateObjectInArray(items, index, {...item, selected: !selected}))
    }

    useLayoutEffect(() => {
        if (containerRef && containerRef.current) {
            setHeight(containerRef.current.clientHeight)
        }
    })

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >       
            <Container ref={containerRef}>
                <TextContainer>
                    <Typography variant="h5" >
                        Select parcels
                    </Typography>
                </TextContainer>
                <List
                    subheader={
                        <Typography variant="body2">
                            Selected total area: 53ha
                        </Typography>
                    }
                    style={{flexGrow: 1, display: "flex", flexDirection: "column"}}
                >
                    <MasterList
                        onSelect={handleSelected}
                        options={{
                            // TODO: Fixme
                            maxHeight: 800,
                        }}
                        style={{flexGrow: 1}}
                        addButton={
                            <SaveButton
                                variant="contained"
                                color="primary"
                            >
                                <FormattedMessage {...globalMessages.save} />
                            </SaveButton>
                        }
                    >
                        {items.map((item, i) => 
                            <Selector key={i} {...item}/>
                        )}
                    </MasterList>
                </List>
            </Container>
        </Drawer>
    )
}

FieldSideSelector.propTypes = {

}

export default FieldSideSelector