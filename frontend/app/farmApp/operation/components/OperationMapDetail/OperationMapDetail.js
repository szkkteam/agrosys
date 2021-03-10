import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { typography } from '@material-ui/system'

import { 
    MapContainer,
    MapControlGeoSearch,
    MapTooltip,
    MapFeature
} from 'farmApp/map/components'

import {
    useMapContainerContext,
    useGeoJsonToLatLong,
    useDispatchAddEvent
} from 'farmApp/map/hooks'

import {
  MapFieldCropTooltip
} from 'farmApp/components'


import { 
    FeatureGroup,
    Polygon,
    Tooltip
} from "react-leaflet";

import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

import {
  CropTag
} from 'farmApp/product/crop/components'

const geo_1 = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                17.716151475906372,
                47.10699701638029
              ],
              [
                17.717020511627197,
                47.10711385437625
              ],
              [
                17.71768569946289,
                47.107391343588816
              ],
              [
                17.718565464019775,
                47.10782948150548
              ],
              [
                17.719091176986694,
                47.10815078035228
              ],
              [
                17.72017478942871,
                47.108807976498156
              ],
              [
                17.71870493888855,
                47.11154620642953
              ],
              [
                17.71692395210266,
                47.111064288176784
              ],
              [
                17.71621584892273,
                47.11088174224454
              ],
              [
                17.715260982513428,
                47.11088174224454
              ],
              [
                17.714145183563232,
                47.11102777904042
              ],
              [
                17.713522911071777,
                47.111049684525234
              ],
              [
                17.713093757629395,
                47.11114460818861
              ],
              [
                17.712289094924927,
                47.111232229881466
              ],
              [
                17.71117329597473,
                47.110969364370156
              ],
              [
                17.711087465286255,
                47.11080872369635
              ],
              [
                17.711806297302246,
                47.11058236556026
              ],
              [
                17.712814807891846,
                47.110545856093324
              ],
              [
                17.713404893875122,
                47.11039251605865
              ],
              [
                17.71370530128479,
                47.11039251605865
              ],
              [
                17.714016437530518,
                47.110217269763794
              ],
              [
                17.71393060684204,
                47.110100438580005
              ],
              [
                17.71366238594055,
                47.11018076004643
              ],
              [
                17.713834047317505,
                47.109947097262065
              ],
              [
                17.71422028541565,
                47.109888681405685
              ],
              [
                17.714542150497437,
                47.109516278814105
              ],
              [
                17.714810371398926,
                47.10930451931567
              ],
              [
                17.715282440185547,
                47.10886639354063
              ],
              [
                17.715486288070675,
                47.10821650033203
              ],
              [
                17.715550661087036,
                47.107844086040615
              ],
              [
                17.715883255004883,
                47.107230692115756
              ],
              [
                17.716022729873657,
                47.10709194727154
              ],
              [
                17.716151475906372,
                47.10699701638029
              ]
            ]
          ]
        }
      }
    ]
  }
  
const geo_2 = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                17.720507383346558,
                47.10889560203783
              ],
              [
                17.720121145248413,
                47.10872035081421
              ],
              [
                17.719745635986328,
                47.1084355663451
              ],
              [
                17.719316482543945,
                47.10815078035228
              ],
              [
                17.718833684921265,
                47.10781487696638
              ],
              [
                17.71843671798706,
                47.107515483031364
              ],
              [
                17.717599868774414,
                47.10705543541033
              ],
              [
                17.717610597610474,
                47.10697510922749
              ],
              [
                17.71818995475769,
                47.107033528281576
              ],
              [
                17.719026803970337,
                47.10715766855863
              ],
              [
                17.71994948387146,
                47.10729641323152
              ],
              [
                17.72095799446106,
                47.107500878406086
              ],
              [
                17.720507383346558,
                47.10889560203783
              ]
            ]
          ]
        }
      }
    ]
  }

const TTip = styled(Tooltip)`
  padding: 0 !important;
  pointer-events: auto !important;
`

const Title = styled(Typography)`
  ${typography}
  margin-left: 15px;
`

const FieldGeo = ({
    feature
}) => {
    const layerRef = useRef(null)
    const addEvent = useDispatchAddEvent()

    const handleClick = (p, e) => {
      console.debug(p.getBounds())
      addEvent(p.getBounds())
    }

    return (
        <MapFeature
            ref={layerRef}
            feature={feature}
            onClick={handleClick}
            tooltip={
              <MapFieldCropTooltip
                title="Field 1"
                area={12570}
                cropType={{
                  short: "őb",
                  title: "Őszi búza"                  
                }}
              />            
            }
        />
    )
}

const Inner = ({

}) => {
    const layerRef = useRef(null)
    const addEvent = useDispatchAddEvent()

    const {
        mapRef,
    } = useMapContainerContext()

    useEffect(() => {
        const bounds = layerRef && layerRef?.current.getBounds()
        addEvent(bounds)
        //mapRef && mapRef.fitBounds(bounds)
    }, [layerRef])

    return (
        <FeatureGroup ref={layerRef}>
            <FieldGeo feature={geo_1} />
            <FieldGeo feature={geo_2} />
        </FeatureGroup>
    )
}

const OperationMapDetail = ({

}) => {

    return (
        <MapContainer
            controls={
                <MapControlGeoSearch />
            }
        >
            <Inner />
        </MapContainer>
    )
}

OperationMapDetail.propTypes = {

}

export default OperationMapDetail