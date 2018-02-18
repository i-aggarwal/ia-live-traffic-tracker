import { Action } from '@ngrx/store';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { Observable } from 'rxjs/Observable';
import { Places } from '../../services/models/places.models';
import { LoadGeojsonSuccessActionPayload, LoadGeojsonFailActionPayload } from './models/actions.models';

export const LOAD_FREEWAYS = '[Map Geo Json] Load freeways';
export const LOAD_FREEWAYS_SUCCESS = '[Map Geo Json] Load freeways Success';
export const LOAD_FREEWAYS_FAIL = '[Map Geo Json] Load freeways Fail';

export const LOAD_ARTRIES = '[Map Geo Json] Load artries';
export const LOAD_ARTRIES_SUCCESS = '[Map Geo Json] Load artries Success';
export const LOAD_ARTRIES_FAIL = '[Map Geo Json] Load artries Fail';

export const LOAD_STREETS = '[Map Geo Json] Load streets';
export const LOAD_STREETS_SUCCESS = '[Map Geo Json] Load streets Success';
export const LOAD_STREETS_FAIL = '[Map Geo Json] Load streets Fail';

export const LOAD_NEIGHBORHOODS = '[Map Geo Json] Load neighborhoods';
export const LOAD_NEIGHBORHOODS_SUCCESS = '[Map Geo Json] Load neighborhoods Success';
export const LOAD_NEIGHBORHOODS_FAIL = '[Map Geo Json] Load neighborhoods Fail';


/**
 * Load List Actions
 */
export class LoadFreewaysAction implements Action {
  readonly type = LOAD_FREEWAYS;
  constructor(public payload: Places) {}
}

export class LoadFreewaysSuccessAction implements Action {
  readonly type = LOAD_FREEWAYS_SUCCESS;

  constructor(public payload: LoadGeojsonSuccessActionPayload) {}
}

export class LoadFreewaysFailAction implements Action {
  readonly type = LOAD_FREEWAYS_FAIL;

  constructor(public payload: LoadGeojsonFailActionPayload) {}
}

export class LoadArtriesAction implements Action {
  readonly type = LOAD_ARTRIES;
  constructor(public payload: Places) {}
}

export class LoadArtriesSuccessAction implements Action {
  readonly type = LOAD_ARTRIES_SUCCESS;

  constructor(public payload: LoadGeojsonSuccessActionPayload) {}
}

export class LoadArtriesFailAction implements Action {
  readonly type = LOAD_ARTRIES_FAIL;

  constructor(public payload: LoadGeojsonFailActionPayload) {}
}


export class LoadStreetsAction implements Action {
  readonly type = LOAD_STREETS;
  constructor(public payload: Places) {}
}

export class LoadStreetsSuccessAction implements Action {
  readonly type = LOAD_STREETS_SUCCESS;

  constructor(public payload: LoadGeojsonSuccessActionPayload) {}
}

export class LoadStreetsFailAction implements Action {
  readonly type = LOAD_STREETS_FAIL;

  constructor(public payload: LoadGeojsonFailActionPayload) {}
}


export class LoadNeighborhoodsAction implements Action {
  readonly type = LOAD_NEIGHBORHOODS;
  constructor(public payload: Places) {}
}

export class LoadNeighborhoodsSuccessAction implements Action {
  readonly type = LOAD_NEIGHBORHOODS_SUCCESS;

  constructor(public payload: LoadGeojsonSuccessActionPayload) {}
}

export class LoadNeighborhoodsFailAction implements Action {
  readonly type = LOAD_NEIGHBORHOODS_FAIL;

  constructor(public payload: LoadGeojsonFailActionPayload) {}
}



export type Actions =
  | LoadFreewaysAction
  | LoadFreewaysSuccessAction
  | LoadFreewaysFailAction
  | LoadArtriesAction
  | LoadArtriesSuccessAction
  | LoadArtriesFailAction
  | LoadStreetsAction
  | LoadStreetsSuccessAction
  | LoadStreetsFailAction
  | LoadNeighborhoodsAction
  | LoadNeighborhoodsSuccessAction
  | LoadNeighborhoodsFailAction;
