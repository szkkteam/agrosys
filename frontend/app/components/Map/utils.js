import { area } from '@turf/turf';

export function getArea(geoJson) {
    return area(geoJson);
}


export const convertLatLngToBounds = (latlngs) => {
    try {
        const c1 = L.latLng(startBounds._northEast)
        const c2 = L.latLng(startBounds._southWest)
        return L.latLngBounds(c1, c2)
    } catch (e) {
        log_error("startBounds given to map is invalid: ", latlngs)
    }
}


export const geoJsonToLatLong = (feature) => {
    let latLong = []
    // Fix latlongs
    feature.geometry.coordinates[0].map((location, index) => {
        latLong.push([location[1] , location[0]])
    })
    return latLong
}
