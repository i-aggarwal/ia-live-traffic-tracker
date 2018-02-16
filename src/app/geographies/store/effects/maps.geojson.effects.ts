import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GeojsonService, cities } from '../../services/geojson.service';
import { fromGeoJson } from '../actions';
import 'rxjs/add/observable/of';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';

@Injectable()
export class GeoJsonEffects {
  constructor(private geojsonService: GeojsonService, private actions$: Actions) {}

  // @Effect()
  // getUsage$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD).switchMap(payload => {
  //   return this.geojsonService.getGeojsons(cities.SFO).map((geoJsons: Array<Observable<any>>) => {
  //     return new fromGeoJson.LoadSuccessAction(geoJsons);
  //   });
  // });

  @Effect()
  getFreeWays$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD_FREEWAYS)
  .map((action: fromGeoJson.LoadFreewayAction) => action.payload)
  .switchMap(payload => {
    return this.geojsonService.getFreeWays(payload)
    .map((freeWay: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      return new fromGeoJson.LoadFreewaySuccessAction({city: payload, freewayGeoJson: freeWay});
    });
  });

  @Effect()
  getUSGeoJson$: Observable<Action> = this.actions$.ofType()
}
