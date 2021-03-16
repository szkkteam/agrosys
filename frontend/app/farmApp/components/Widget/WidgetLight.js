import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useFormatTitle } from 'utils/hooks'

import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardInfo from '../Card/CardInfo'

const WidgetLight = ({
    title,
    subheader,
    tooltip,
    headerProps={},
    children
}) => {
    return (
        <Card
            spacing={[2, 2]}
        >
            <CardHeader
                color="default"
                shrinkHeader
                title={title}
                subheader={subheader}
                action={
                    <CardInfo title={tooltip}
                    />
                }
                {...headerProps}
            />
            {children}
        </Card>  
    )
}

WidgetLight.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    subheader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default WidgetLight