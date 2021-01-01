import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid';

import { useSplitComponents } from 'utils/hooks'
/*
const Container = styled(Grid)`
    //height: ${props => props.height? `${props.height}px` : '100%'};
    flex-grow: 1;
`
*/

const masterWidth = 450

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
`


const MasterContainer = styled.div`
    display: flex;
    height: 100%;
    width: ${masterWidth}px;
    padding-right: 10px;
    & > div {
        width: 100%;
    }
`

const DetailContainer = styled.div`
    height: 100%;
    width: 100%;
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
            {...props}
        >
            <MasterContainer>
                {_.isFunction(masterComponent)? 
                    masterComponent()
                    : 
                    masterComponent
                }
            </MasterContainer>
            <DetailContainer>
                {_.isFunction(detailComponent)? 
                    detailComponent()
                    : 
                    detailComponent
                }
            </DetailContainer>
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