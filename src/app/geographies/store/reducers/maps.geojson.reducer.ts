import { fromGeoJson } from '../actions';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { Places } from '../../services/models/places.models';

export interface PlaceDetails {
  freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  neighborhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  streets: FeatureCollection<GeometryObject, GeoJsonProperties>;
  artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
  failure: Array<string>;
}

export interface State {
  [place: string]: PlaceDetails;
}

export const initialSate: State = {};

export function reducer(state: State = initialSate, action: fromGeoJson.Actions): State {
  switch (action.type) {
    case fromGeoJson.LOAD_FREEWAYS: {
      const placeId = action.payload.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: []
        }
      };
    }
    case fromGeoJson.LOAD_FREEWAYS_SUCCESS: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          freeways: action.payload.geoJson
        }
      };
    }
    case fromGeoJson.LOAD_FREEWAYS_FAIL: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: state[placeId].failure.concat([action.payload.failure])
        }
      };
    }
    case fromGeoJson.LOAD_ARTRIES: {
      const placeId = action.payload.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: []
        }
      };
    }
    case fromGeoJson.LOAD_ARTRIES_SUCCESS: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          artries: action.payload.geoJson
        }
      };
    }
    case fromGeoJson.LOAD_ARTRIES_FAIL: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: state[placeId].failure.concat([action.payload.failure])
        }
      };
    }
    case fromGeoJson.LOAD_STREETS: {
      const placeId = action.payload.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: []
        }
      };
    }
    case fromGeoJson.LOAD_STREETS_SUCCESS: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          streets: action.payload.geoJson
        }
      };
    }
    case fromGeoJson.LOAD_STREETS_FAIL: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: state[placeId].failure.concat([action.payload.failure])
        }
      };
    }
    case fromGeoJson.LOAD_NEIGHBORHOODS: {
      const placeId = action.payload.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: []
        }
      };
    }
    case fromGeoJson.LOAD_NEIGHBORHOODS_SUCCESS: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          neighborhoods: action.payload.geoJson
        }
      };
    }
    case fromGeoJson.LOAD_NEIGHBORHOODS_FAIL: {
      const placeId = action.payload.place.id;
      return {
        ...state,
        [placeId]: {
          ...state[placeId],
          failure: state[placeId].failure.concat([action.payload.failure])
        }
      };
    }
    default:
      return state;
  }
}

export const getGeoDetailsByPlace = (place: Places) => (state: State) => state[place.id];
export const getFreeways = (state: PlaceDetails) => state.freeways;
export const getArtries = (state: PlaceDetails) => state.artries;
export const getStreets = (state: PlaceDetails) => state.streets;
export const getNeighborhoods = (state: PlaceDetails) => state.neighborhoods;
