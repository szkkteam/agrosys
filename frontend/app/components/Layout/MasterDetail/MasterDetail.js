import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid';

import { useSplitComponents } from 'utils/hooks'

const Container = styled(Grid)`
    height: 100%;
`

const MasterDetail = ({
    master=null,
    detail=null,
    masterSize=3,
    children,
    ...props
}) => {
    const detailSize = 12 - masterSize

    const {
        componentAChild: masterComponent,
        componentBChild: detailComponent
    } = useSplitComponents(master, detail, children)

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
    header: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.oneOf([null])
    ]),
    content: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
}

export default MasterDetail