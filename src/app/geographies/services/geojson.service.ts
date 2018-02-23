import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import { Places } from './models/places.models';
import { Store } from '@ngrx/store';

@Injectable()
export class GeojsonService {
  // Ideally should be in store
  static cityMap: {
    [key: string]: {
      projection?: d3Geo.GeoProjection;
      path?: d3Geo.GeoPath<any, any>;
      width: number;
      height: number;
    };
  } = {
    SFO: {
      width: 600,
      height: 600
    }
  };

  static setProjections(place: Places) {
    GeojsonService.cityMap[place.id].projection = d3Geo
      .geoMercator()
      .scale(1)
      .translate([0, 0])
      .precision(0);
  }

  static getProjections(place: Places): d3Geo.GeoProjection {
    return GeojsonService.cityMap[place.id].projection;
  }

  static setPath(place: Places) {
    GeojsonService.cityMap[place.id].path = d3Geo.geoPath().projection(GeojsonService.cityMap[place.id].projection);
  }

  static getPath(place: Places) {
    return GeojsonService.cityMap[place.id].path;
  }

  static setProjectionsBoundByData(data: Object, place: Places) {
    const bounds = GeojsonService.cityMap[place.id].path.bounds(data);
    const xScale = GeojsonService.cityMap[place.id].width / Math.abs(bounds[1][0] - bounds[0][0]);
    const yScale = GeojsonService.cityMap[place.id].height / Math.abs(bounds[1][1] - bounds[0][1]);
    const scale = xScale < yScale ? xScale : yScale;
    const transl = [
      (GeojsonService.cityMap[place.id].width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (GeojsonService.cityMap[place.id].height - scale * (bounds[1][1] + bounds[0][1])) / 2
    ];
    // TODO: Ishan - Check how this works!

    GeojsonService.cityMap = {
      ...GeojsonService.cityMap,
      [place.id]: {
        ...GeojsonService.cityMap[place.id],
        projection: GeojsonService.cityMap[place.id].projection
          .scale(scale)
          .translate([
            (GeojsonService.cityMap[place.id].width - scale * (bounds[1][0] + bounds[0][0])) / 2,
            (GeojsonService.cityMap[place.id].height - scale * (bounds[1][1] + bounds[0][1])) / 2
          ])
      }
    };
  }

  getPlaces(): Observable<Array<Places>> {
    // TODO: Ishan - Should be an API call that returns this data
    return Observable.of([
      {
        id: 'SFO',
        name: 'San Francisco'
      }
    ]);
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
