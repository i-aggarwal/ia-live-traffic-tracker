import { Action } from '@ngrx/store';
import {
  AgencyListApiResponse,
  RouteListApiResponse,
  RouteConfigApiResponse,
  VehicleLocationApiResponse
} from '../../services/models/live-traffic.models';
import {
  LoadRoutesSuccessPayloadType,
  LoadRoutesFailurePayloadType,
  LoadRouteConfigSuccessPayloadType,
  LoadRouteConfigFailurePayloadType,
  LiveTrafficActionBasePayloadType,
  RouteDeatilsBasePayloadType,
  LoadVehicleLocationSuccessPayloadType,
  LoadVehicleLocationFailurePayloadType,
  LoadVehicleLocationPayloadType,
  LoadAllRouteConfigPayloadType,
  LoadAllRouteConfigSuccessPayloadType,
  LoadAllRouteConfigFailurePayloadType,
  LoadVehicleLocationForAgencySuccessPayloadType,
  LoadVehicleLocationForAgencyPayloadType,
  LoadVehicleLocationForAgencyFailurePayloadType
} from './models/actions.models';

export const LOAD_AGENCIES = '[Live Trafic] Load agencies';
export const LOAD_AGENCIES_SUCCESS = '[Live Trafic] Load agencies Success';
export const LOAD_AGENCIES_FAIL = '[Live Trafic] Load agencies Fail';

export const LOAD_ROUTES = '[Live Trafic] Load routes';
export const LOAD_ROUTES_SUCCESS = '[Live Trafic] Load routes Success';
export const LOAD_ROUTES_FAIL = '[Live Trafic] Load routes Fail';

export const LOAD_ROUTES_CONFIG = '[Live Trafic] Load routes config';
export const LOAD_ROUTES_CONFIG_SUCCESS = '[Live Trafic] Load routes config Success';
export const LOAD_ROUTES_CONFIG_FAIL = '[Live Trafic] Load routes config Fail';

export const LOAD_ALL_ROUTES_CONFIG = '[Live Trafic] Load all routes config';
export const LOAD_ALL_ROUTES_CONFIG_SUCCESS = '[Live Trafic] Load all routes config Success';
export const LOAD_ALL_ROUTES_CONFIG_FAIL = '[Live Trafic] Load all routes config Fail';

export const LOAD_VEHICLE_LOCATION = '[Live Trafic] Load vehicle location';
export const LOAD_VEHICLE_LOCATION_SUCCESS = '[Live Trafic] Load vehicle location Success';
export const LOAD_VEHICLE_LOCATION_FAIL = '[Live Trafic] Load vehicle location Fail';

export const LOAD_VEHICLE_LOCATION_FOR_AGENCY = '[Live Trafic] Load vehicle location for agency';
export const LOAD_VEHICLE_LOCATION_FOR_AGENCY_SUCCESS = '[Live Trafic] Load vehicle location for agency Success';
export const LOAD_VEHICLE_LOCATION_FOR_AGENCY_FAIL = '[Live Trafic] Load vehicle location for agency Fail';

/**
 * Load List Actions
 */
export class LoadAgenciesAction implements Action {
  readonly type = LOAD_AGENCIES;
}

export class LoadAgenciesSuccessAction implements Action {
  readonly type = LOAD_AGENCIES_SUCCESS;

  constructor(public payload: AgencyListApiResponse) {}
}

export class LoadAgenciesFailAction implements Action {
  readonly type = LOAD_AGENCIES_FAIL;

  constructor(public payload: Object[]) {}
}

export class LoadRoutesAction implements Action {
  readonly type = LOAD_ROUTES;

  constructor(public payload: LiveTrafficActionBasePayloadType) {}
}

export class LoadRoutesSuccessAction implements Action {
  readonly type = LOAD_ROUTES_SUCCESS;

  constructor(public payload: LoadRoutesSuccessPayloadType) {}
}

export class LoadRoutesFailAction implements Action {
  readonly type = LOAD_ROUTES_FAIL;

  constructor(public payload: LoadRoutesFailurePayloadType) {}
}

export class LoadRouteConfigAction implements Action {
  readonly type = LOAD_ROUTES_CONFIG;

  constructor(public payload: RouteDeatilsBasePayloadType) {}
}

export class LoadRouteConfigSuccessAction implements Action {
  readonly type = LOAD_ROUTES_CONFIG_SUCCESS;

  constructor(public payload: LoadRouteConfigSuccessPayloadType) {}
}

export class LoadRouteConfigFailAction implements Action {
  readonly type = LOAD_ROUTES_CONFIG_FAIL;

  constructor(public payload: Object[]) {}
}

export class LoadAllRouteConfigAction implements Action {
  readonly type = LOAD_ALL_ROUTES_CONFIG;

  constructor(public payload: LoadAllRouteConfigPayloadType) {}
}

export class LoadAllRouteConfigSuccessAction implements Action {
  readonly type = LOAD_ALL_ROUTES_CONFIG_SUCCESS;

  constructor(public payload: LoadAllRouteConfigSuccessPayloadType) {}
}

export class LoadAllRouteConfigFailAction implements Action {
  readonly type = LOAD_ALL_ROUTES_CONFIG_FAIL;

  constructor(public payload: LoadAllRouteConfigFailurePayloadType) {}
}

export class LoadVehicleLocationAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION;

  constructor(public payload: LoadVehicleLocationPayloadType) {}
}

export class LoadVehicleLocationSuccessAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION_SUCCESS;

  constructor(public payload: LoadVehicleLocationSuccessPayloadType) {}
}

export class LoadVehicleLocationFailAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION_FAIL;

  constructor(public payload: LoadVehicleLocationFailurePayloadType) {}
}

export class LoadVehicleLocationForAgencyAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION_FOR_AGENCY;

  constructor(public payload: LoadVehicleLocationForAgencyPayloadType) {}
}

export class LoadVehicleLocationForAgencySuccessAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION_FOR_AGENCY_SUCCESS;

  constructor(public payload: LoadVehicleLocationForAgencySuccessPayloadType) {}
}

export class LoadVehicleLocationForAgencyFailAction implements Action {
  readonly type = LOAD_VEHICLE_LOCATION_FOR_AGENCY_FAIL;

  constructor(public payload: LoadVehicleLocationForAgencyFailurePayloadType) {}
}


export type Actions =
  | LoadAgenciesAction
  | LoadAgenciesSuccessAction
  | LoadAgenciesFailAction
  | LoadRoutesAction
  | LoadRoutesSuccessAction
  | LoadRoutesFailAction
  | LoadRouteConfigAction
  | LoadRouteConfigSuccessAction
  | LoadRouteConfigFailAction
  | LoadAllRouteConfigAction
  | LoadAllRouteConfigSuccessAction
  | LoadAllRouteConfigFailAction
  | LoadVehicleLocationAction
  | LoadVehicleLocationSuccessAction
  | LoadVehicleLocationFailAction
  | LoadVehicleLocationForAgencyAction
  | LoadVehicleLocationForAgencySuccessAction
  | LoadVehicleLocationForAgencyFailAction;
