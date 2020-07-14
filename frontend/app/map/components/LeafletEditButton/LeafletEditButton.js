import React from 'react';
import { MapLayer, MapControl } from 'react-leaflet';
import { withLeaflet } from 'react-leaflet';

class LeafletEditButton extends MapControl {

    createLeafletElement(opts) {
        const MapInfo = L.Control.extend({
          onAdd: (map) => {
            this.panelDiv = L.DomUtil.create('div', 'toolbar');
            return this.panelDiv;
          }
        });
        return new MapInfo({ position: 'topright' });
    }
}

export default withLeaflet(LeafletEditButton);