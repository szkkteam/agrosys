import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid';

import { useSplitComponents } from 'utils/hooks'

const Container = styled(Grid)`
    //height: ${props => props.height? `${props.height}px` : '100%'};
    flex-grow: 1;
`

const MasterDetail = ({
    masterSize=3,
    //height=null,
    children,
    ...props
}) => {
    const detailSize = 12 - masterSize

    const [masterComponent, detailComponent] = useSplitComponents(children)

    return (
        <Container
            container
            spacing={1}
            {...props}
        >
            <Container item xs={masterSize}>
                {_.isFunction(masterComponent)? 
                    masterComponent()
                    : 
                    masterComponent
                }
            </Container>
            <Container item xs={detailSize}>
                {_.isFunction(detailComponent)? 
                    detailComponent()
                    : 
                    detailComponent
                }
            </Container>
        </Container>
    )
}

MasterDetail.propTypes = {
    masterSize: PropTypes.number,
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
}

export default MasterDetail