import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { AppBar } from 'farmApp/components'


//import ResourceTabs from '../ResourceTabs/ResourceTabs'

const ResourceAppBar = ({
    ...props
}) => {
    return (
        <AppBar
            goUpRoute={{
                to: ROUTES.ResourceWorker
            }}
            {...props}
        >
        </AppBar>
    )
}

ResourceAppBar.propTypes = {

}

export default ResourceAppBar