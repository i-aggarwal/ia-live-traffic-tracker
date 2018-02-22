import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLiveTracker from './live-traffic.reducer';

export const reducers = fromLiveTracker.reducer;

const getGeoFeatureSelector = createFeatureSelector<fromLiveTracker.LiveTrafficState>('live-traffic');

export function getRoutesByAgency(agencyTag: string) {
  return createSelector(getGeoFeatureSelector, fromLiveTracker.getRoutesByAgency(agencyTag));
}
export function getRoutesConfigForAgency(agencyTag: string, routeTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getRoutesConfigByRoute(routeTag));
}
export function getVehileLocationForRoute(agencyTag: string, routeTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getVehicleLocationByRoute(routeTag));
}
export function getRouteDetailsForRoute(agencyTag: string, routeTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getRoutesDetailByRoute(routeTag));
}
export function getAllRouteDetails(agencyTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getAllRouteDetails);
}
export function getAllRouteConfig(agencyTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getAllRouteConfig);
}

export function getAllVehicleLocations(agencyTag: string) {
  return createSelector(getRoutesByAgency(agencyTag), fromLiveTracker.getAllVehicleLocations);
}
