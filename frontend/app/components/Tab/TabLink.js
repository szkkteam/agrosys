import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Tab from '@material-ui/core/Tab';

/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */
const LoadableLink = forwardRef((linkProps, ref) => 
        <Link ref={ref} {...linkProps}/>)


const TabLink = ({
    to,
    value,
    ...props
}) => <Tab component={LoadableLink} to={to ?? value} value={value} {...props} />

TabLink.propTypes = {
    value: PropTypes.any.isRequired,
    to: PropTypes.string,
}

export default TabLink