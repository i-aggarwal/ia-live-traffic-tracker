import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';
import { LiveTraffic } from './live-trafic/services/live-trafic.service';
import { Route, RouteConfig, VehicleLocation } from './live-trafic/services/models/live-traffic.models';
import { Store } from '@ngrx/store';
import * as liveTrafficAction from './live-trafic/store/actions';
import * as fromLiveTrafficReducer from './live-trafic/store/reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import * as fromGeo from './geographies/store/reducers';
import * as actions from './geographies/store/actions';
import { Places } from './geographies/services/models/places.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  agency = 'sf-muni';
  place: Places = {
    id: 'SFO',
    name: 'San Francisco'
  };

  vehicleLocation$: Observable<{ [kay: string]: Array<VehicleLocation> }>;
  routes$: Observable<Array<Route>>;
  routesConfig$: Observable<{ [key: string]: RouteConfig }>;

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.vehicleLocation$ = this.store.select(fromLiveTrafficReducer.getAllVehicleLocations(this.agency));
    this.routes$ = this.store.select(fromLiveTrafficReducer.getAllRouteDetails(this.agency));
    this.routesConfig$ = this.store.select(fromLiveTrafficReducer.getAllRouteConfig(this.agency));

    // this.store.dispatch(new actions.fromGeoJson.LoadFreewaysAction(this.place));
    // this.store.dispatch(new actions.fromGeoJson.LoadArtriesAction(this.place));
    // this.store.dispatch(new actions.fromGeoJson.LoadStreetsAction(this.place));
    this.store.dispatch(new actions.fromGeoJson.LoadNeighborhoodsAction(this.place));
    this.store.dispatch(new liveTrafficAction.fromLiveTraffic.LoadAllRouteConfigAction({ agencyTag: this.agency }));
    this.store.dispatch(new liveTrafficAction.fromLiveTraffic.LoadRoutesAction({ agencyTag: this.agency }));
    this.store.dispatch(
      new liveTrafficAction.fromLiveTraffic.LoadVehicleLocationForAgencyAction({
        agencyTag: this.agency,
        epochTime: new Date().getTime() - 10 * 1000 + ''
      })
    );
  }
}
