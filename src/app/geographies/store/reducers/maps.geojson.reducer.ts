import { fromGeoJson } from '../actions';
import { cities } from '../../services/geojson.service';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';

export interface CityGeoDetails {
  freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  neighbourhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  streets: FeatureCollection<GeometryObject, GeoJsonProperties>;
  artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
}

export interface CountryDetails {
  geoJson: FeatureCollection<GeometryObject, GeoJsonProperties>;
  cities: Array<CityGeoDetails>;
}

export interface GeoDetailsState {
  [country: string]: CityGeoDetails;
}

export const initialSate: GeoDetailsState = {};

export function reducer(state: GeoDetailsState = initialSate, action: fromGeoJson.Actions): GeoDetailsState {
  switch (action.type) {
    case fromGeoJson.LOAD_US_GEOJSON_SUCCESS:
    case fromGeoJson.LOAD_FREEWAYS:
    case fromGeoJson.LOAD_US_GEOJSON:
    case fromGeoJson.LOAD_FREEWAYS_SUCCESS:
    case fromGeoJson.LOAD_FREEWAYS_FAIL:
    default:
      return state;
  }
}

export const getGeoDetailsByCity = (city: cities) => (state: GeoDetailsState) => state[city];
export const getFreeWay = (state: CityGeoDetails) => state.freeways;
