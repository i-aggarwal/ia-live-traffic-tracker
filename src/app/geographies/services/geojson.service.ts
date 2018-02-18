import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { Places } from './models/places.models';
import { Store } from '@ngrx/store';

@Injectable()
export class GeojsonService {

  getPlaces(): Observable<Array<Places>> {
    // TODO: Ishan - Should be an API call that returns this data
    return Observable.of([{
      id: 'SFO',
      name: 'San Francisco'
    }]);
  }

  getFreeWays(place: Places): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    // TODO: Ishan - Should be an API call that returns this data
    const freeways = require('../../assets/geoJsons/freeways.json');
    return Observable.of(freeways);
  }

  getArtries(place: Places): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    // Should be an API call that returns this data
    const artries = require('../../assets/geoJsons/arteries.json');
    return Observable.of(artries);
  }

  getStreets(place: Places): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    // Should be an API call that returns this data
    const streets = require('../../assets/geoJsons/streets.json');
    return Observable.of(streets);
  }

  getNeighborhoods(place: Places): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    // Should be an API call that returns this data
    const neighborhoods = require('../../assets/geoJsons/neighborhoods.json');
    return Observable.of(neighborhoods);
  }
}
