import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GeojsonService } from '../../services/geojson.service';
import { fromGeoJson } from '../actions';
import 'rxjs/add/observable/of';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';

@Injectable()
export class GeoJsonEffects {
  constructor(private geojsonService: GeojsonService, private actions$: Actions) {}

  @Effect()
  getFreeWays$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD_FREEWAYS)
  .map((action: fromGeoJson.LoadFreewaysAction) => action.payload)
  .switchMap(payload => {
    return this.geojsonService.getFreeWays(payload)
    .map((freeWay: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      return new fromGeoJson.LoadFreewaysSuccessAction({place: payload, geoJson: freeWay});
    });
  });

  @Effect()
  getArtries$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD_FREEWAYS)
  .map((action: fromGeoJson.LoadArtriesAction) => action.payload)
  .switchMap(payload => {
    return this.geojsonService.getArtries(payload)
    .map((artries: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      return new fromGeoJson.LoadArtriesSuccessAction({place: payload, geoJson: artries});
    });
  });

  @Effect()
  getStreets$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD_FREEWAYS)
  .map((action: fromGeoJson.LoadStreetsAction) => action.payload)
  .switchMap(payload => {
    return this.geojsonService.getStreets(payload)
    .map((streets: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      return new fromGeoJson.LoadStreetsSuccessAction({place: payload, geoJson: streets});
    });
  });

  @Effect()
  getNeighborhoods$: Observable<Action> = this.actions$.ofType(fromGeoJson.LOAD_FREEWAYS)
  .map((action: fromGeoJson.LoadNeighborhoodsAction) => action.payload)
  .switchMap(payload => {
    return this.geojsonService.getNeighborhoods(payload)
    .map((neighborhoods: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      return new fromGeoJson.LoadNeighborhoodsSuccessAction({place: payload, geoJson: neighborhoods});
    });
  });
}
