import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import { ROUTE_MAP } from 'routes'
import Tab from '@material-ui/core/Tab';
import { withLinkComponent } from 'utils/hoc'

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

const Link = withLinkComponent(Tab)

const TabLink = ({
    to,
    value,
    ...props
}) => {
    return (        
        <Link to={to ?? value} value={value} {...props} />
    )
}

TabLink.propTypes = {
    value: PropTypes.any.isRequired,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ])
}

export default TabLink