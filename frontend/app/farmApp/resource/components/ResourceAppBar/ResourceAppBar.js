import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import ResourceTabs from '../ResourceTabs/ResourceTabs'

const ResourceAppBar = ({
    
}) => {
    return (
        <AppBar
            title={messages.title}
        >
            <ResourceTabs />
        </AppBar>
    )
}

ResourceAppBar.propTypes = {

}

export default React.memo(ResourceAppBar)