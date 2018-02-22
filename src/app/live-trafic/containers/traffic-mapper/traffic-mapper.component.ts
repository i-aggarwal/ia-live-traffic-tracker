import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLiveTraffic } from '../../store/actions';
import { RouteConfig, VehicleLocation } from '../../services/models/live-traffic.models';

@Component({
  selector: 'app-traffic-mapper',
  templateUrl: './traffic-mapper.component.html',
  styleUrls: ['./traffic-mapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficMapperComponent implements OnInit {
  @Input() agency = 'sf-muni';
  @Input() route: string;
  @Input() routesConfig: Array<RouteConfig>;
  @Input() vehicleLocations: Array<VehicleLocation>;
  constructor(private store: Store<any>) {}
  ngOnInit(): void {}
}
