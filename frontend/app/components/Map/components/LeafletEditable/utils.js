import { area } from '@turf/turf';

export function getArea(geoJson) {
    return area(geoJson);
}