import React from 'react'
import 'leaflet-editable'
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

class LeafletEditable extends React.Component {
    constructor(props, context) {
        super(props)
        //props.leaflet.map.editable = true
        
        this.state = {
            map: props.leaflet.map
        }
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


    componentDidMount() {
        this._registerListeners()
        this.state.map.editTools.startPolygon();
    }

    componentWillUnmount() {
        this._unregisterListener()
    }

    render() {
        return (
            null
        )
    }
}


export default withLeaflet(LeafletEditable)