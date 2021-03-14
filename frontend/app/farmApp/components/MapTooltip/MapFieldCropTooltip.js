import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { typography, spacing } from '@material-ui/system'
import { useConvertArea } from 'utils/hooks'

import {
  Typography,
  IconButton
} from '@material-ui/core'

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
  CropTag
} from 'farmApp/product/crop/components'



const AreaTitle = styled(Typography)`
  ${typography}
  ${spacing}
  margin: 0 auto;
  margin-right: 0px;
`

const FieldTitle = styled(Typography)`
  ${typography}
  ${spacing}
  max-width: 75px;
`

const Container = styled.div`
  padding: 3px 5px;
  width: 130px;
`

const Flex = styled.div`
  ${spacing}
  display: flex;
  align-items: center;
  width: 100%;
`

const CropRight = styled(CropTag)`
  //margin: 0 auto;
  //margin-right: 0px;
`

const MoreButton = styled(IconButton)`
  margin: 0 auto;
  margin-right: 0px;
`

const MapFieldCropTooltip = ({
  title,
  area,
  cropType,
  onClick
}) => {

  const convertedArea = useConvertArea(area)
  return (
    <Container>
      <Flex>
          <FieldTitle variant="body2" fontWeight="fontWeightBold">
            {title}
          </FieldTitle>        
          <AreaTitle variant="body2" >
            {convertedArea}
          </AreaTitle>
      </Flex> 
      {cropType && <Flex pt={1}>
        <CropRight
          defaultExpand={true}
          {...cropType}
          />
        {onClick && <MoreButton size="small" onClick={onClick}>
          <ChevronRightIcon fontSize="small" />
        </MoreButton> }
      </Flex> }
    </Container>
  )
}

MapFieldCropTooltip.propTypes = {

}

export default MapFieldCropTooltip