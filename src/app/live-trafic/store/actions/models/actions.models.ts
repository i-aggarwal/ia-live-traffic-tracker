import { Route, RouteConfig, VehicleLocation } from '../../../services/models/live-traffic.models';

export interface LiveTrafficActionBasePayloadType {
  agencyTag: string;
}

export interface LoadRoutesSuccessPayloadType extends LiveTrafficActionBasePayloadType {
  routes: Array<Route>;
}

export interface LoadRoutesFailurePayloadType extends LiveTrafficActionBasePayloadType {
  errors: Array<string>;
}

export interface RouteDeatilsBasePayloadType extends LiveTrafficActionBasePayloadType {
  routeTag?: string;
}

export interface LoadRouteConfigSuccessPayloadType extends RouteDeatilsBasePayloadType {
  config: RouteConfig;
}

export interface LoadRouteConfigFailurePayloadType extends RouteDeatilsBasePayloadType {
  errors: Array<string>;
}

export interface LoadAllRouteConfigSuccessPayloadType extends LiveTrafficActionBasePayloadType {
  config: Array<RouteConfig>;
}

export interface LoadAllRouteConfigFailurePayloadType extends LiveTrafficActionBasePayloadType {
  errors: Array<string>;
}

export interface LoadVehicleLocationPayloadType extends RouteDeatilsBasePayloadType {
  epochTime: string;
}

export interface LoadVehicleLocationSuccessPayloadType extends RouteDeatilsBasePayloadType {
  vehicleLocation: Array<VehicleLocation>;
}

export interface LoadVehicleLocationFailurePayloadType extends RouteDeatilsBasePayloadType {
  errors: Array<string>;
}



export interface LoadVehicleLocationForAgencyPayloadType extends LiveTrafficActionBasePayloadType {
  epochTime?: string;
}

export interface LoadVehicleLocationForAgencySuccessPayloadType extends LiveTrafficActionBasePayloadType {
  vehicleLocation: Array<VehicleLocation>;
}

export interface LoadVehicleLocationForAgencyFailurePayloadType extends LiveTrafficActionBasePayloadType {
  errors: Array<string>;
}
export type LoadAllRouteConfigPayloadType = LiveTrafficActionBasePayloadType;
