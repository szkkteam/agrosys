import React, { useEffect, useState, useCallback, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing, style } from '@material-ui/system';

import {
    Paper,
    Chip,
    IconButton,
    Collapse,
    Divider,
    Button,
} from '@material-ui/core'

import FilterListIcon from '@material-ui/icons/FilterList';
import messages from './messages';

const Container = styled(Paper)`
    ${spacing}
    width: 100%;
    min-height: 56px;
`

const List = styled.ul`
    margin-top: 0;
    margin-bottom: 0;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const SpacerChip = styled(Chip)`
    ${spacing}
`

const FilterContext = createContext({
    onDelete: null,
})

const FilterItem = ({
    id,
    title,
    ...props
}) => {
    const intl = useIntl()

    const {
        onDelete
    } = useContext(FilterContext)

    const handleDelete = () => {
        onDelete && onDelete(id)
    }

    return (
        <SpacerChip
            mx={1}
            color="primary"
            label={typeof(title) === 'object'? intl.formatMessage(title) : title}
            onDelete={handleDelete}
        />
    )
}

const TableFilter = ({
    filters,
    onFilterDelete,
    onFilterSave,
    onFilterClear,
    content,
    ...props
}) => {
    
    const [expanded, setExpanded] = useState(false)

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const handleClose = () => {
        setExpanded(false)
    }

    const handleSave = () => {
        onFilterSave && onFilterSave()
        setExpanded(false)
    }

    const contextObject = {
        onDelete: onFilterDelete
    }

    const renderFilters = () => {
        return filters && filters.map((filter, i) => (
            <FilterItem key={`filter-${i}`}
                {...filter}
            />    
        ))
    }
    
    return (
        <Container
            mb={1}
        >
            <Flex>
                <IconButton
                    onClick={toggleExpand}
                >
                    <FilterListIcon />
                </IconButton>
                <List>
                    <FilterContext.Provider value={contextObject}>
                        {filters && Array.isArray(filters) && filters.length? (
                            renderFilters()
                        ) : (
                            <FormattedMessage {...messages.noFilters} />
                        )}                        
                    </FilterContext.Provider>
                </List>
            </Flex>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {content}
                <Divider/>
                <Flex>
                    <Spacer/>
                    <Button
                        color="primary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Flex>
            </Collapse>

        </Container>

    )
}

TableFilter.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.object
        ]).isRequired,
        id: PropTypes.string.isRequired
    })),
    onFilterDelete: PropTypes.func,
    onFilterSave: PropTypes.func,
    onFilterClear: PropTypes.func
}

export default React.memo(TableFilter)