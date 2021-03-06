import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'

import {
    Link as MuiLink,
    Breadcrumbs
} from '@material-ui/core';

const Link = withLinkComponent(MuiLink)

const Breadcrumb = ({
    links,
    ...props
}) => {
  
    return (
        <Breadcrumbs>
            {links && links.map(({title, ...link}, i) => (
                <Link key={`breadcrumb-${title}-${i}`}
                    {...i === links.length - 1? {
                        color: "textPrimary",
                        disabled: true
                    } : {
                        color: "inherit"
                    }}
                    {...link}
                >
                    {typeof(title) === 'object'? <FormattedMessage {...title}/> : title }
                </Link>
            ))}
        </Breadcrumbs>

    )
}

export const BreadcrumbPropTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,        
        to: PropTypes.string.isRequired,
        params: PropTypes.object
    }))
}


Breadcrumb.propTypes = BreadcrumbPropTypes

export default Breadcrumb