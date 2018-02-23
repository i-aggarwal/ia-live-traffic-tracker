import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { GeoJsonObject, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import * as d3 from 'd3';
import { MapsBaseComponent } from './maps-base.component';
import { RouteConfig } from '../../live-trafic/services/models/live-traffic.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pairwise';
import { GeojsonService } from '../../geographies/services/geojson.service';
import { Places } from '../../geographies/services/models/places.models';

@Component({
  selector: 'app-map-builder',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapBuilderComponent extends MapsBaseComponent implements OnInit, AfterViewInit {
  @Input() freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() neighborhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() streets: FeatureCollection<GeometryObject, GeoJsonProperties>;

  constructor(protected elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadBaseMap();
  }

  loadBaseMap() {
    this.loadNeighborhoods();
    this.loadStreets();
    this.loadArtries();
    this.loadFreeways();
  }

  loadNeighborhoods() {
    if (this.neighborhoods) {
      GeojsonService.setProjectionsBoundByData(this.neighborhoods, this.place);
      this.projections = GeojsonService.getProjections(this.place);
      const neighborhoodGroup = this.svg.append('g').attr('id', 'neighborhoods');
      neighborhoodGroup
        .selectAll('path')
        .data(this.neighborhoods.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .style('fill', '#E5DDDB')
        .style('stroke', '#E0BCB3')
        .style('stroke-width', '1px');
    }
  }

  loadArtries() {
    if (this.artries) {
      const artriesGroup = this.svg.append('g').attr('id', 'artries');
      artriesGroup
        .selectAll('path')
        .data(this.artries.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .style('stroke', 'lightblue')
        .style('fill', '#E5DDDB')
        .style('stroke-width', '1px');
    }
  }

  loadFreeways() {
    if (this.freeways) {
      const freewaysGroup = this.svg.append('g').attr('id', 'freeways');
      freewaysGroup
        .selectAll('path')
        .data(this.freeways.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .style('stroke', '#F5E1A6')
        .style('fill', '#E5DDDB')
        .style('stroke-width', '2px');
    }
  }

  loadStreets() {
    if (this.streets) {
      const streetGroup = this.svg.append('g').attr('id', 'streets');
      streetGroup
        .selectAll('path')
        .data(this.streets.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .style('fill', '#E5DDDB')
        .style('stroke', '#FAF2EF')
        .style('stroke-width', '1px');
    }
  }
}
