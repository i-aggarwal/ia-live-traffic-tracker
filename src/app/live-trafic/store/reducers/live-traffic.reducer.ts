import { fromLiveTraffic } from '../actions';
import { Agency, Route, RouteConfig, VehicleLocation } from '../../services/models/live-traffic.models';

export interface RouteDetails {
  details?: Route;
  routesConfig?: RouteConfig;
  vehicleLocation?: Array<VehicleLocation>;
}

export interface RouteState {
  [routeTag: string]: RouteDetails;
}

export interface AgencyState {
  details: Agency;
  routes: RouteState;
}

export interface LiveTrafficState {
  [agencyTag: string]: AgencyState;
}

export const initialSate: LiveTrafficState = {
  'sf-muni': <AgencyState>{}
};

export const getRoutesByAgency = (agencyTag: string) => (state: LiveTrafficState) => state[agencyTag].routes;
export const getRoutesConfigByRoute = (routeTag: string) => (routeState: RouteState) => {
  return { [routeTag]: routeState[routeTag].routesConfig };
};
export const getVehicleLocationByRoute = (routeTag: string) => (routeState: RouteState) => {
  return routeState[routeTag].vehicleLocation;
};
export const getRoutesDetailByRoute = (routeTag: string) => (routeState: RouteState) => routeState[routeTag].details;
export const getAllRouteDetails = (routeState: RouteState) => {
  return Object.keys(routeState || {}).map((key: string) => {
    return routeState[key].details;
  });
};
export const getAllRouteConfig = (routeState: RouteState) => {
  const routeConfig: { [key: string]: RouteConfig } = {};
  Object.keys(routeState || {}).forEach((key: string) => {
    routeConfig[key] = routeState[key].routesConfig;
  });

  return routeConfig;
};
export const getAllVehicleLocations = (routeState: RouteState) => {
  const vehicleLocations: { [key: string]: Array<VehicleLocation> } = {};
  Object.keys(routeState || {}).forEach((key: string) => {
    vehicleLocations[key] = routeState[key].vehicleLocation;
  });
  return vehicleLocations;
};

export function reducer(state: LiveTrafficState = initialSate, action: fromLiveTraffic.Actions): LiveTrafficState {
  switch (action.type) {
    case fromLiveTraffic.LOAD_AGENCIES:
    case fromLiveTraffic.LOAD_ROUTES:
    case fromLiveTraffic.LOAD_ROUTES_CONFIG:
    case fromLiveTraffic.LOAD_ALL_ROUTES_CONFIG:
    case fromLiveTraffic.LOAD_VEHICLE_LOCATION:
    case fromLiveTraffic.LOAD_VEHICLE_LOCATION_FOR_AGENCY:
      return state;
    case fromLiveTraffic.LOAD_AGENCIES_SUCCESS: {
      const AGENCIES: Array<Agency> = action.payload.agency;
      let newState: LiveTrafficState = {};
      AGENCIES.forEach((agency: Agency) => {
        newState = {
          ...newState,
          [agency.tag]: {
            ...newState[agency.tag],
            details: { ...newState[agency.tag]['details'], ...agency }
          }
        };
      });
      return newState;
    }
    case fromLiveTraffic.LOAD_ROUTES_SUCCESS: {
      const AGENCY_TAG = action.payload.agencyTag;
      let routes = {};
      action.payload.routes.forEach((route: Route) => {
        routes[route.tag] =
          (state[AGENCY_TAG] && state[AGENCY_TAG].routes && state[AGENCY_TAG].routes[route.tag]) || {};
        routes = {
          ...routes,
          [route.tag]: {
            ...routes[route.tag],
            details: route
          }
        };
      });
      return {
        ...state,
        [AGENCY_TAG]: {
          ...state[AGENCY_TAG],
          routes: routes
        }
      };
    }
    case fromLiveTraffic.LOAD_ROUTES_CONFIG_SUCCESS: {
      const AGENCY_TAG = action.payload.agencyTag;
      const ROUTE_TAG = action.payload.routeTag;
      return {
        ...state,
        [AGENCY_TAG]: {
          ...state[AGENCY_TAG],
          routes: {
            ...state[AGENCY_TAG].routes,
            [ROUTE_TAG]: {
              ...state[AGENCY_TAG].routes[ROUTE_TAG],
              routesConfig: action.payload.config
            }
          }
        }
      };
    }
    case fromLiveTraffic.LOAD_ALL_ROUTES_CONFIG_SUCCESS: {
      const AGENCY_TAG = action.payload.agencyTag;
      let routes = {};
      action.payload.config.forEach((config: RouteConfig) => {
        routes[config.tag] =
          (state[AGENCY_TAG] && state[AGENCY_TAG].routes && state[AGENCY_TAG].routes[config.tag]) || {};
        routes = {
          ...routes,
          [config.tag]: {
            ...routes[config.tag],
            routesConfig: config
          }
        };
      });
      return {
        ...state,
        [AGENCY_TAG]: {
          ...state[AGENCY_TAG],
          routes: routes
        }
      };
    }
    case fromLiveTraffic.LOAD_VEHICLE_LOCATION_SUCCESS: {
      const AGENCY_TAG = action.payload.agencyTag;
      const ROUTE_TAG = action.payload.routeTag;
      return {
        ...state,
        [AGENCY_TAG]: {
          ...state[AGENCY_TAG],
          routes: {
            ...state[AGENCY_TAG].routes,
            [ROUTE_TAG]: {
              ...state[AGENCY_TAG].routes[ROUTE_TAG],
              vehicleLocation: action.payload.vehicleLocation
            }
          }
        }
      };
    }
    case fromLiveTraffic.LOAD_VEHICLE_LOCATION_FOR_AGENCY_SUCCESS: {
      const AGENCY_TAG = action.payload.agencyTag;
      const routes: RouteState = {};
      let agencyState: AgencyState;

      if (state[AGENCY_TAG]) {
        agencyState = { ...state[AGENCY_TAG] };
        action.payload.vehicleLocation.forEach((vehicleLocations: VehicleLocation) => {
          // Ignoring vehicles for which there is no route
          if (agencyState.routes && agencyState.routes[vehicleLocations.routeTag]) {
            routes[vehicleLocations.routeTag] = routes[vehicleLocations.routeTag] || {
              details: agencyState.routes[vehicleLocations.routeTag].details,
              routesConfig: agencyState.routes[vehicleLocations.routeTag].routesConfig,
              vehicleLocation: []
            };
            routes[vehicleLocations.routeTag].vehicleLocation = routes[
              vehicleLocations.routeTag
            ].vehicleLocation.concat([vehicleLocations]);
          }
        });

        return {
          ...state,
          [AGENCY_TAG]: {
            ...state[AGENCY_TAG],
            routes: {
              ...state[AGENCY_TAG].routes,
              ...routes
            }
          }
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
