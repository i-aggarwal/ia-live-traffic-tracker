import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { Places } from '../../../services/models/places.models';

export interface LoadGeojsonSuccessActionPayload {
  place: Places;
  geoJson: FeatureCollection<GeometryObject, GeoJsonProperties>;
}

export interface LoadGeojsonFailActionPayload {
  place: Places;
  failure: string;
}
