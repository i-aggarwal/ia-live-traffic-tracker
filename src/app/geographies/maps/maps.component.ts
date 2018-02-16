import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { cities } from '../services/geojson.service';
import { Observable } from 'rxjs/Observable';
import { FeatureCollection, GeometryObject, GeoJsonProperties } from 'geojson';
import * as fromGeo from '../store/reducers';
import * as actions from '../store/actions';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @Input() city: cities = cities.SFO;

  freeways$: Observable<FeatureCollection<GeometryObject, GeoJsonProperties>>;

  constructor(public store: Store<any>) { }

  ngOnInit() {
    this.freeways$ = this.store.select(fromGeo.getFreeWay(this.city));
    this.store.dispatch(new actions.fromGeoJson.LoadFreewayAction(this.city));
  }

}
