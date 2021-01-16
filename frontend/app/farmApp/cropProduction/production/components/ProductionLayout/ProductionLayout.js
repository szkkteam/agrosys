import React, { useRef, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'

import { 
    HeaderContent,
    HeaderContentContext,
    MasterDetail,
    Tabs,
    TabLink
} from 'components'

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

//<HashRoute path="" component={({location}) => <Redirect to={{...location, hash: TAB_SUMMARY}} />} />

const ProductionLayout = ({
    history,
    match,
    //location,
    ...props
}) => {
    const intl = useIntl()
    const location = useLocation()

    return (
        <div>Layout</div>

    )
}

/*
        <HeaderContent
        >
            <StyledTabs
                value={location.hash || TAB_SUMMARY}
                orientation="horizontal"
            >
                { tabs && tabs.map((tab, i) => 
                    <TabLink key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title} />    
                )}            
            </StyledTabs>
            <ProductionRoutes
            />
        </HeaderContent>
*/

ProductionLayout.propTypes = {
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default ProductionLayout
