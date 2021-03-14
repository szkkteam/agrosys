import React, { useRef, useEffect } from 'react';
import { usePrevious } from 'utils/hooks'
import { change } from 'redux-form'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { FORM_PARCEL } from 'parcel/constants'

import { mapEvents, mapEdit } from 'components/Map/actions'
import { selectMap } from 'components/Map/reducer'
/*
import {
    getSelectedParcel,
} from 'parcel/selectors' */
import { selectSelectedSeasons } from 'season/reducers/seasons'

import {
    Draw,
    Map,
    MapToolbar,
    EditToolbarGroup,
} from 'components/Map/components'

import {
    parcelTypesEnum,
} from 'parcel/constants'

const MapContainer = (props) => {
    const { 
        isNew,
        isEdit,
        isDraw,
        mapEdit,
        mapEvents,
        initialValues,
        updateTotalArea,
        updateEligibleArea,
        updateGeometry,
        isAreaLocked,
        referenceParcelType,
    } = props

    //const draw = React.createRef();
    const draw = useRef(null)
    const prevProps = usePrevious({isNew, isEdit, isDraw})

    const updateForm = (feature) => {
        const { geometry, area } = feature
        updateGeometry(geometry)
        isAreaLocked && updateTotalArea(area)
        referenceParcelType != parcelTypesEnum.AGRICULTURAL_PARCEL && isAreaLocked && updateEligibleArea(area)
    }

    const onFinished = ({featureInEdit, bounds}) => {
        // Force the map bounds to the new geometry
        toBounds(bounds)
        updateForm(featureInEdit)
    }

    const toBounds = (bounds) => {
        mapEvents && mapEvents.add({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
    }

    const onFeatureAdded = ({layer, bounds}) => {
        toBounds(bounds)
    }

    const onUpdate = ({featureInEdit}) => {
        updateForm(featureInEdit)
    }

    useEffect(() => {
        // New editing signal arrived from the store
        if ( prevProps && isEdit && isEdit !== prevProps.isEdit ) {            
            draw.current.addPolygon(initialValues.geometry)
            draw.current.toggleEdit(true)
        }      
    }, [prevProps, isEdit])

    useEffect(() => {       
        // New add signal arrived from store
        if ( prevProps && isNew && isNew !== prevProps.isNew ) draw.current.drawPolygon()
    }, [prevProps, isNew])

    useEffect(() => {      
        // New cancel signal arrived from store
        if ( prevProps && !isDraw && isDraw !== prevProps.isDraw ) draw.current.stopDraw()
    }, [prevProps, isDraw])

    useEffect(() => {      
        // Dispatch cancel, when page is left
        return () => {
            isDraw && mapEdit && mapEdit.cancel()
        }
    }, [])

    return (
            <Map
                editable={true}                
            >   
                <Draw
                    ref={draw}
                    onUpdate={onUpdate}
                    onFinished={onFinished}
                    onFeatureAdded={onFeatureAdded}
                />
                <MapToolbar
                >
                    <EditToolbarGroup
                    />
                </MapToolbar>
            </Map> 
    )
}


const mapStateToProps = (state) => {
    const mapState = selectMap(state)
    return ({
        isDraw: mapState.editData !== null,
        isEdit: mapState.isEditing && mapState.editData !== null,
        isNew: !mapState.isEditing && mapState.editData !== null,
        initialValues: mapState.editData,
        selectedParcel: null,
        selectedSeason: null,
    })
}

const withConnect = connect(
    mapStateToProps,
    (dispatch) => ({
        ...bindRoutineCreators({ mapEvents, mapEdit }, dispatch),
        updateGeometry: (value) => dispatch(change(FORM_PARCEL, 'geometry', value)),
        updateTotalArea: (value) => dispatch(change(FORM_PARCEL, 'totalArea', value)),
        updateEligibleArea: (value) => dispatch(change(FORM_PARCEL, 'eligibleArea', value))
    }),
)


const selector = formValueSelector(FORM_PARCEL)
const withParcelFormAreaLock = connect(
    (state, props) => {
        const isAreaLocked = selector(state, 'isAreaLocked')
        const referenceParcelType = selector(state, 'referenceParcelType')
        return {
            isAreaLocked,
            referenceParcelType
        }
    }
)


export default compose(
    withConnect,
    withParcelFormAreaLock,
)(MapContainer)
