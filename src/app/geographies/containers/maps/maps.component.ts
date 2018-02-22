import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import * as fromGeo from '../../store/reducers';
import * as actions from '../../store/actions';
import { Places } from '../../services/models/places.models';
import { Route, RouteConfig } from '../../../live-trafic/services/models/live-traffic.models';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements OnInit {
  @Input()
  city: Places = {
    id: 'sfo',
    name: 'San Francisco'
  };

  @Input()
  agency = 'sf-muni';

  freeways$: Observable<FeatureCollection<GeometryObject, GeoJsonProperties>>;
  streets$: Observable<FeatureCollection<GeometryObject, GeoJsonProperties>>;
  artries$: Observable<FeatureCollection<GeometryObject, GeoJsonProperties>>;
  neighborhoods$: Observable<FeatureCollection<GeometryObject, GeoJsonProperties>>;

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.freeways$ = this.store.select(fromGeo.getFreeways(this.city));
    this.streets$ = this.store.select(fromGeo.getStreets(this.city));
    this.artries$ = this.store.select(fromGeo.getArtries(this.city));
    this.neighborhoods$ = this.store.select(fromGeo.getNeighborhood(this.city));

    this.store.dispatch(new actions.fromGeoJson.LoadFreewaysAction(this.city));
    this.store.dispatch(new actions.fromGeoJson.LoadArtriesAction(this.city));
    this.store.dispatch(new actions.fromGeoJson.LoadStreetsAction(this.city));
    this.store.dispatch(new actions.fromGeoJson.LoadNeighborhoodsAction(this.city));
  }
}
