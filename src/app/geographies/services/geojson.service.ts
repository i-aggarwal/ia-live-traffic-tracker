import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';

export enum cities {
  SFO = 'San Fransisco',
  LONDON = 'London'
}

@Injectable()
export class GeojsonService {
  getGeojsons(city: cities): Array<Observable<any>> {
    if (city === cities.SFO) {
      const geoJsonPaths = [
        '../../assets/geJsons/arteries.json',
        '../../assets/geJsons/freeways.json',
        '../../assets/geJsons/neighborhoods.json',
        '../../assets/geJsons/streets.json'
      ];
      return geoJsonPaths.map(path => Observable.fromPromise(d3.json(path)));
    } else {
      throw new Error('City not implemented');
    }
  }

  getFreeWays(city: cities): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    const freeways = require('../../assets/geoJsons/freeways.json');
    if (city === cities.SFO) {
      return Observable.of(freeways);
    } else {
      throw new Error('City not implemented');
    }
  }

  getUSGeoJson(): Observable<FeatureCollection<GeometryObject, GeoJsonProperties>> {
    const us = require('./assets/geoJsons/us-states.json');
    return Observable.of(us);
  }
}
