import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    FormCardLayout
} from 'farmApp/components'

import {
    Grid
} from '@material-ui/core'

import FieldDetailMapSnapshot from '../FieldDetailMapSnapshot/FieldDetailMapSnapshot'

const FieldDetailGeneral = ({

}) => {

    const handleEditBorder = () => {
        
    }

    return (
         <Grid container spacing={4}>
             <Grid item xs={8}>
                <FormCardLayout
                    title="Field parameters"
                >

                </FormCardLayout>
                
             </Grid>
             <Grid item xs={4}>
                 <FieldDetailMapSnapshot
                    onBorderEditClick={handleEditBorder}
                 />
             </Grid>
         </Grid>
    )
}

FieldDetailGeneral.propTypes = {

}

export default FieldDetailGeneral