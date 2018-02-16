import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as geoReducer from './maps.geojson.reducer';
import { cities } from '../../services/geojson.service';

export const reducers = geoReducer.reducer;

const getGeoFeatureSelector = createFeatureSelector<geoReducer.GeoDetailsState>('geo-details');

export function getGeoDetailsByCity(city: cities) {
  return createSelector(getGeoFeatureSelector, geoReducer.getGeoDetailsByCity(city));
}
export function getFreeWay(city: cities) {
  return createSelector(getGeoDetailsByCity(city), geoReducer.getFreeWay);
}
