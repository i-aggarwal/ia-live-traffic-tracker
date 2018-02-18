import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';
import { LiveTraffic } from './live-trafic/services/live-trafic.service';
import { Observable } from 'rxjs/Observable';
import { Route, RouteConfig } from './live-trafic/services/models/live-traffic.models';
import { Store } from '@ngrx/store';
import * as liveTrafficAction from './live-trafic/store/actions';
import * as fromLiveTrafficReducer from './live-trafic/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  routesForAgency$: Observable<Array<Route>>;
  routesConfigForAgency$: Observable<Array<RouteConfig>>;
  agency = 'sf-muni';

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.routesForAgency$ = this.store.select(fromLiveTrafficReducer.getAllRouteDetails(this.agency));
    this.routesConfigForAgency$ = this.store.select(fromLiveTrafficReducer.getAllRouteConfig(this.agency));

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
