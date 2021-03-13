import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { MASTER_DETAIL_BREAKPOINT } from 'farmApp/constants'

import Grid from '@material-ui/core/Grid';

import { useSplitComponents } from 'utils/hooks'
/*
const Container = styled(Grid)`
    //height: ${props => props.height? `${props.height}px` : '100%'};
    flex-grow: 1;
`
*/

const Container = styled(Grid)`
    //display: flex;
    //flex-direction: row;
    height: 100%;
    position: relative;
`


const MasterContainer = styled(({spacing: dummy, ...props}) => <Grid {...props}/>)`
    ${({theme, spacing}) => `
        width: 100%;
        display: flex;
        height: 100%;

        flex-grow: 0;
        max-width: 100%;
        flex-basis: 100%;
        
        ${theme.breakpoints.up(MASTER_DETAIL_BREAKPOINT)} {
            flex-grow: 0;
            max-width: 33.333333%;
            flex-basis: 33.333333%;
            padding-right: ${spacing}px;
        }

        ${theme.breakpoints.up('md')} {
            max-width: 350px;
        }
    `}
`

const DetailContainer = styled(Grid)`
    ${({theme}) => `
        height: 100%;
        width: 100%;
        position: relative;

        ${theme.breakpoints.up('md')} {
            max-width: 100%;
            flex-basis: 100%;
        }
    `}
    
`

const MasterDetail = ({
    spacing=10,
    //height=null,
    children,
    ...props
}) => {
    const [masterComponent, detailComponent] = useSplitComponents(children)

    return (
        <Container
            container
            direction="row"
            wrap="nowrap"
            {...props}
        >
            <MasterContainer
                spacing={spacing}
                item
                xs={12}
                sm={4}
            >
                {_.isFunction(masterComponent)? 
                    masterComponent()
                    : 
                    masterComponent
                }
            </MasterContainer>
            {detailComponent && 
                <DetailContainer
                    item
                    xs={8}
                >
                    {_.isFunction(detailComponent)? 
                        detailComponent()
                        : 
                        detailComponent
                    }
                </DetailContainer> 
            }
        </Container>
    )
}

MasterDetail.propTypes = {
    masterSize: PropTypes.number,
    /*
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
    */
}

export default MasterDetail