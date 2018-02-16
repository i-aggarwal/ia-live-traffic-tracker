import { Action } from '@ngrx/store';

export const LOAD = '[Live Trafic] Load';
export const LOAD_SUCCESS = '[Live Trafic] Load Success';
export const LOAD_FAIL = '[Live Trafic] Load Fail';

/**
 * Load List Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string[]) {}
}

export type Actions = LoadAction | LoadSuccessAction | LoadFailAction;
