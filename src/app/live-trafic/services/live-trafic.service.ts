import { Injectable } from '@angular/core';
import {
  AgencyListApiResponse,
  RouteListApiResponse,
  RouteConfigApiResponse,
  VehicleLocation,
  VehicleLocationApiResponse
} from './models/live-traffic.models';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class LiveTraffic {
  private readonly URL = 'http://webservices.nextbus.com/service/publicJSONFeed';

  constructor(private http: HttpClient) {}

  getAgencies(): Observable<AgencyListApiResponse> {
    const REQUEST_URL = this.URL + '?command=agencyList';
    return this.http
      .get(REQUEST_URL)
      .map((response: AgencyListApiResponse) => response)
      .catch((error: any) => Observable.of(<AgencyListApiResponse>{}));
  }

  getRoutes(agencyTag: string): Observable<RouteListApiResponse> {
    const REQUEST_URL = this.URL + '?command=routeList&a=' + (agencyTag || 'sf-muni');
    return this.http
      .get(REQUEST_URL)
      .map((response: RouteListApiResponse) => response)
      .catch((error: any) => Observable.of(<RouteListApiResponse>{}));
  }

  getRoutesConfig(agencyTag: string, routeTag?: string): Observable<RouteConfigApiResponse> {
    const REQUEST_URL =
      this.URL + '?command=routeConfig&a=' + (agencyTag || 'sf-muni') + ((routeTag && '&r=' + routeTag) || '');
    return this.http
      .get(REQUEST_URL)
      .map((response: RouteConfigApiResponse) => response)
      .catch((error: any) => Observable.of(<RouteConfigApiResponse>{}));
  }

  getVehicleLocation(agencyTag: string, routeTag: string, epochTime: string): Observable<VehicleLocationApiResponse> {
    const REQUEST_URL =
      this.URL +
      '?command=vehicleLocations&a=' +
      (agencyTag || 'sf-muni') +
      ((routeTag && '&r=' + routeTag) || '') +
      ((epochTime && '&t=' + epochTime) || '');
    return this.http
      .get(REQUEST_URL)
      .map((response: VehicleLocationApiResponse) => response)
      .catch((error: any) => Observable.of(<VehicleLocationApiResponse>{}));
  }
}
