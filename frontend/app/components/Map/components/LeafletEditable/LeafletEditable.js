import React from 'react'
import 'leaflet-editable'
import L from 'leaflet';
import { withLeaflet, useLeaflet } from "react-leaflet";

import 'highlight.js/styles/tomorrow-night-eighties.css'


const eventHandlers = {
    onEditing: "editable:editing",
    onEnable: 'editable:enable',
    onDisable: 'editable:disable',

    onStartDrawing: 'editable:drawing:start',
    onDrawingClick: 'editable:drawing:click',
    onDrawingCommit: 'editable:drawing:commit',
    onDrawingMouseDown: 'editable:drawing:mousedown',
    onDrawingMouseUp: 'editable:drawing:mouseup',
    onDrawingMove: 'editable:drawing:move',
    onCancelDrawing: 'editable:drawing:cancel',
    onEndDrawing: "editable:drawing:end",

    // drag:Event
    onDragStart: 'editable:dragstart',
    onDrag: 'editable:drag',
    onDragEnd: 'editable:dragend',
    onVertexMarkerDrag: 'editable:vertex:drag',
    onVertexMarkerDragStart: 'editable:vertex:dragstart',
    onVertexMarkerDragEnd: 'editable:vertex:dragend',
    // VertexEvent
    onVertextCtrlClick: 'editable:vertex:ctrlclick',
    onNewVertex: 'editable:vertex:new',
    onVertexMarkerClick: 'editable:vertex:click',
    onVertexRawMarkerClick: 'editable:vertex:rawclick',
    onVertexDeleted: 'editable:vertex:deleted',
    onVertexMarkerCtrlClick: 'editable:vertex:ctrlclick',
    onVertexMarkerShiftClick: 'editable:vertex:shiftclick',
    onVertexMarkerMetaKeyClick: 'editable:vertex:metakeyclick',
    onVertexMarkerAltClick: 'editable:vertex:altclick',
    onVertexMarkerContextMenu: 'editable:vertex:contextmenu',
    onVertexMarkerMouseDown: 'editable:vertex:mousedown',
    onVertexMarkerMouseOver: 'editable:vertex:mouseover',
    onVertexMarkerMouseOut: 'editable:vertex:mouseout',
    onMiddleMarkerMouseDown: 'editable:middlemarker:mousedown',
    // ShapeEvent
    onShapeNew: 'editable:shape:new',
    onShapeDelete:'editable:shape:delete',
    onShapeDeleted: 'editable:shape:deleted',
}

/**
 * TODO:
 * https://gis.stackexchange.com/questions/237171/making-a-geojson-layer-editable-with-the-leaflet-editable-plugin
 * 1) Convert GeoJSON to polygon like the above link.
 * 2) Add the polygon to the map
 * 3) Enable edit on the polygon
 */
class LeafletEditable extends React.Component {
    constructor(props, context) {
        super(props)
        //props.leaflet.map.editable = true
        
        this.state = {
            map: props.leaflet.map
        }
        this.redoBuffer = []
        this.editLayer = null
    }

    static defaultProps = {
        enableEdit: false,
        startDraw: false,  
        featureInEdit: null,
    }


    _registerListeners = () => {
        const {map} = this.state;
        Object.keys(eventHandlers).forEach(key => {
            map&&map.on(eventHandlers[key], (e) => {
                this.props[key]&&this.props[key](e, map)
            })
        })
    }

    _unregisterListener = () => {
        const {map} = this.state;
        if (!map) return;
        Object.keys(eventHandlers).forEach(key => {
            map.off(eventHandlers[key])
        })
    }
        
    _geoJsonToLatLong = (feature) => {
        let latLong = []
        // Fix latlongs
        feature.geometry.coordinates[0].map((location, index) => {
            latLong.push([location[1] , location[0]])
        })
        return latLong
    }


    performRedo = () => {
        const { map } = this.state
        if (!map.editTools._drawingEditor) return
        if (this.redoBuffer.length) {
            map.editTools._drawingEditor.push(this.redoBuffer.pop())
        }
    }

    performUndo = () => {
        const { map } = this.state
        if (!map.editTools._drawingEditor) return
        var latLong = map.editTools._drawingEditor.pop()
        if (latLong) this.redoBuffer.push(latLong)
    }

    setEdit = (status) => {
        if (this.editLayer) {
            if (status) this.editLayer.enableEdit()
            else this.editLayer.disableEdit()
        }
    }

    addPolygon = (feature) => {
        const { map } = this.state
        const { onFeatureAdded } = this.props
        const polygonData = ('geometry' in feature) ? this._geoJsonToLatLong(feature) : feature
        this.editLayer = L.polygon(polygonData).addTo(map)
        onFeatureAdded && onFeatureAdded({
            layer: this.editLayer,
        }) 
    }

    drawPolygon = () => {
        const { map } = this.state
        this.editLayer = map.editTools.startPolygon()
    }

    stopDraw = () => {
        const { map } = this.state
        if (map.editTools.drawing()) {
            map.editTools.stopDrawing()            
        }
        this.clear()
    }

    clear = () => {
        const { map } = this.state
        this.editLayer && map.removeLayer(this.editLayer)
    }

    /*
    drawOrAddPolygon = () => {
        const { map } = this.state
        const { featureInEdit, enableEdit } = this.props
        //console.log("drawOrAddPolygon.props: ", this.props)
        if (featureInEdit) {
            this.editLayer = this.addPolygonToLayer(map, featureInEdit)            
            this.toggleEdit(enableEdit)
        } else {
            // Start drawing a new feature
            this.editLayer = map.editTools.startPolygon()
        }
    }

    addPolygonToLayer = (map, featureInEdit) => {
        const { onFeatureAdded } = this.props
        // Add feature to layer
        // Add polygon to the map
        //this.editLayer && map.removeLayer(this.editLayer)        
        var polygon = L.polygon(this.geoJsonToLatLong(featureInEdit)).addTo(map)
        // Disable dragging of the new layer
        polygon.dragging && polygon.dragging.disable()
        // Fire event for feature added
        onFeatureAdded && onFeatureAdded({
            layer: polygon,
        }) 
        return polygon
    }



    componentDidMount() {
        console.log("LeafletEditable -> componentDidMount")
        // Registering all the event handlers
        this._registerListeners()
        // Subscribe to draw:end event
        const {map} = this.state
        map&&map.on('editable:drawing:end', () => {
            this.redoBuffer = []
        })
        // Add or Draw polygon 
        this.drawOrAddPolygon()       
    }

    componentWillUpdate(nextProps) {        
        console.log("LeafletEditable -> componentWillUpdate")
        const { map } = this.state
        const { enableEdit, reDraw } = nextProps
        if (this.props.enableEdit != nextProps.enableEdit) {
            this.toggleEdit(nextProps.enableEdit)
        }        
        //console.log("nextProps.featureInEdit: ", nextProps.featureInEdit)
        //console.log("this.props.featureInEdit: ", this.props.featureInEdit)
        if ((nextProps.featureInEdit !== this.props.featureInEdit) || reDraw) {
            //console.log("LeafletEditable -> drawOrAddPolygon")
            // Add polygon to the map
            // FIXME: Removing layer is causing the feature flickering on the map.
            this.editLayer && map.removeLayer(this.editLayer)
            this.drawOrAddPolygon(map, nextProps.featureInEdit, enableEdit)
        }
    }*/
    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
        this._registerListeners()
    }

    componentWillUnmount() {
        const { map } = this.state
        console.log("LeafletEditable -> componentWillUnmount")
        this._unregisterListener()
        if (map.editTools.drawing()) {
            map.editTools.stopDrawing()
        }
        this.editLayer && map.removeLayer(this.editLayer)
        this.editLayer = null
        this.redoBuffer = []
    }

    render() {
        return (
            null
        )
    }
}


export default withLeaflet(LeafletEditable)