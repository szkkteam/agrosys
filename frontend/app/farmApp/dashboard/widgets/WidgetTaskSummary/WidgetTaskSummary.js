import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    WidgetContainer
} from 'components'

const WidgetTaskSummary = ({
    title,
    ...props
}) => {


    return (
        <WidgetContainer
            headerProps={{
                title,
                subheader: "Show upcoming tasks"
            }}
            {...props}
        >                            
            <div>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
                Tasks tasks <br/>
            </div>
        </WidgetContainer>
    )
}

WidgetTaskSummary.propTypes = {

}

export default WidgetTaskSummary