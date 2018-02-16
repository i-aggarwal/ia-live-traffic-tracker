import { Action } from '@ngrx/store';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { cities } from '../../services/geojson.service';
import { Observable } from 'rxjs/Observable';

export const LOAD_FREEWAYS = '[Map Geo Json] Load';
export const LOAD_FREEWAYS_SUCCESS = '[Map Geo Json] Load Success';
export const LOAD_FREEWAYS_FAIL = '[Map Geo Json] Load Fail';

export const LOAD_US_GEOJSON = '[Map Geo Json] Load US';
export const LOAD_US_GEOJSON_SUCCESS = '[Map Geo Json] Load US Success';
export const LOAD_US_GEOJSON_FAIL = '[Map Geo Json] Load US Fail';

/**
 * Load List Actions
 */
export class LoadFreewayAction implements Action {
  readonly type = LOAD_FREEWAYS;
  constructor(public payload: cities) {}
}

export class LoadFreewaySuccessAction implements Action {
  readonly type = LOAD_FREEWAYS_SUCCESS;

  constructor(public payload: LoadFreewaySuccessActionPayload) {}
}

export class LoadFreewayFailAction implements Action {
  readonly type = LOAD_FREEWAYS_FAIL;

  constructor(public payload: LoadFreewayFailActionPayload) {}
}

export class LoadUsGeojsonAction implements Action {
  readonly type = LOAD_US_GEOJSON;
}

export class LoadUsGeojsonSuccessAction implements Action {
  readonly type = LOAD_US_GEOJSON_SUCCESS;

  constructor(public usGeojson: FeatureCollection<GeometryObject, GeoJsonProperties>) {}
}

export class LoadUsGeojsonFailAction implements Action {
  readonly type = LOAD_US_GEOJSON_FAIL;

  constructor(public failure: string) {}
}

export type Actions =
  | LoadFreewayAction
  | LoadFreewaySuccessAction
  | LoadFreewayFailAction
  | LoadUsGeojsonAction
  | LoadUsGeojsonSuccessAction
  | LoadUsGeojsonFailAction;

export interface LoadFreewaySuccessActionPayload {
  city: cities;
  freewayGeoJson: FeatureCollection<GeometryObject, GeoJsonProperties>;
}

export interface LoadFreewayFailActionPayload {
  city: cities;
  failure: string;
}
