import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as geoReducer from './maps.geojson.reducer';
import { Places } from '../../services/models/places.models';

export const reducers = geoReducer.reducer;

const getGeoFeatureSelector = createFeatureSelector<geoReducer.State>('geo-details');

export function getGeoDetailsByPlace(place: Places) {
  return createSelector(getGeoFeatureSelector, geoReducer.getGeoDetailsByPlace(place));
}

export function getFreeways(place: Places) {
  return createSelector(getGeoDetailsByPlace(place), geoReducer.getFreeways);
}

export function getArtries(place: Places) {
  return createSelector(getGeoDetailsByPlace(place), geoReducer.getArtries);
}

export function getStreets(place: Places) {
  return createSelector(getGeoDetailsByPlace(place), geoReducer.getStreets);
}

export function getNeighborhood(place: Places) {
  return createSelector(getGeoDetailsByPlace(place), geoReducer.getNeighborhoods);
}
