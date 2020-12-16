import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TabLink from '../TabLink'

/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */
/*
const LoadableLink = forwardRef((linkProps, ref) => 
        <Link ref={ref} {...linkProps}/>)
*/


const StyledTabLink = styled(props => <TabLink {...props} />)`
    ${({theme}) => `
        flex-grow: 1;
        color: rgba(0, 0, 0, 0.38);
        border: 1px solid rgba(0, 0, 0, 0.12);        
        padding: 5px;
        min-height: 10px;

        &.Mui-selected {
            color: ${theme.palette.primary.contrastText};
            background-color: ${theme.palette.primary.main};
        }
        &:not(.Mui-selected):hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    `}
`

const TabButton = ({
    className,
    ...props
}) => {
    return (        
        <StyledTabLink 
            //className={`${className}`}
            {...props}
        />
        //<StyledTabLink className={`${classes.selected} ${className}`} {...props} />
    )
}

TabButton.propTypes = {

}

export default TabButton