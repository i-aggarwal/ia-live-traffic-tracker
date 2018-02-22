import { Injectable } from '@angular/core';
import { LiveTraffic } from '../../services/live-trafic.service';
import 'rxjs/add/observable/from';
import { Actions, Effect } from '@ngrx/effects';
import { fromLiveTraffic } from '../actions';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import {
  AgencyListApiResponse,
  RouteListApiResponse,
  RouteConfigApiResponse,
  VehicleLocation,
  VehicleLocationApiResponse,
  RouteConfig
} from '../../services/models/live-traffic.models';
import {
  LiveTrafficActionBasePayloadType,
  RouteDeatilsBasePayloadType,
  LoadVehicleLocationPayloadType,
  LoadAllRouteConfigPayloadType,
  LoadVehicleLocationForAgencyPayloadType
} from '../actions/models/actions.models';

@Injectable()
export class LivetrafficEffects {
  constructor(private liveTrafficService: LiveTraffic, private actions$: Actions, private store: Store<any>) {}

  @Effect()
  getAgencies$: Observable<Action> = this.actions$.ofType(fromLiveTraffic.LOAD_AGENCIES).switchMap(() => {
    return this.liveTrafficService.getAgencies().map((agencies: AgencyListApiResponse) => {
      return new fromLiveTraffic.LoadAgenciesSuccessAction(agencies);
    });
  });

  @Effect()
  getRoutes$: Observable<Action> = this.actions$
    .ofType(fromLiveTraffic.LOAD_ROUTES)
    .map((action: fromLiveTraffic.LoadRoutesAction) => action.payload)
    .switchMap((payload: LiveTrafficActionBasePayloadType) => {
      return this.liveTrafficService.getRoutes(payload.agencyTag).map((routes: RouteListApiResponse) => {
        return new fromLiveTraffic.LoadRoutesSuccessAction({ agencyTag: payload.agencyTag, routes: routes.route });
      });
    });

  @Effect()
  getRoutesConfig$: Observable<Action> = this.actions$
    .ofType(fromLiveTraffic.LOAD_ROUTES_CONFIG)
    .map((action: fromLiveTraffic.LoadRouteConfigAction) => action.payload)
    .switchMap((payload: RouteDeatilsBasePayloadType) => {
      return this.liveTrafficService
        .getRoutesConfig(payload.agencyTag, payload.routeTag)
        .map((routesConfig: RouteConfigApiResponse) => {
          return new fromLiveTraffic.LoadRouteConfigSuccessAction({
            agencyTag: payload.agencyTag,
            routeTag: payload.routeTag,
            config: <RouteConfig>routesConfig.route
          });
        });
    });

  @Effect()
  getAllRoutesConfig$: Observable<Action> = this.actions$
    .ofType(fromLiveTraffic.LOAD_ALL_ROUTES_CONFIG)
    .map((action: fromLiveTraffic.LoadAllRouteConfigAction) => action.payload)
    .switchMap((payload: LoadAllRouteConfigPayloadType) => {
      return this.liveTrafficService.getRoutesConfig(payload.agencyTag).map((routesConfig: RouteConfigApiResponse) => {
        return new fromLiveTraffic.LoadAllRouteConfigSuccessAction({
          agencyTag: payload.agencyTag,
          config: <Array<RouteConfig>>routesConfig.route
        });
      });
    });

  @Effect()
  getVehicleLocation$: Observable<Action> = this.actions$
    .ofType(fromLiveTraffic.LOAD_VEHICLE_LOCATION)
    .map((action: fromLiveTraffic.LoadVehicleLocationAction) => action.payload)
    .switchMap((payload: LoadVehicleLocationPayloadType) => {
      return this.liveTrafficService
        .getVehicleLocation(payload.agencyTag, payload.routeTag, payload.epochTime)
        .map((vehicleLocation: VehicleLocationApiResponse) => {
          return new fromLiveTraffic.LoadVehicleLocationSuccessAction({
            agencyTag: payload.agencyTag,
            routeTag: payload.routeTag,
            vehicleLocation: vehicleLocation.vehicle
          });
        });
    });

  @Effect()
  getVehicleLocationForAgency$: Observable<Action> = this.actions$
    .ofType(fromLiveTraffic.LOAD_VEHICLE_LOCATION_FOR_AGENCY)
    .map((action: fromLiveTraffic.LoadVehicleLocationForAgencyAction) => action.payload)
    .switchMap((payload: LoadVehicleLocationForAgencyPayloadType) => {
      return this.liveTrafficService
        .getVehicleLocation(payload.agencyTag, undefined, payload.epochTime || (new Date().getTime() + ''))
        .map((vehicleLocation: VehicleLocationApiResponse) => {
          return new fromLiveTraffic.LoadVehicleLocationForAgencySuccessAction({
            agencyTag: payload.agencyTag,
            vehicleLocation: vehicleLocation.vehicle
          });
        });
    });
}
