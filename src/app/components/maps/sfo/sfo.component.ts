import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GeoJsonObject, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import * as d3 from 'd3';
import { MapsBaseComponent } from '../maps-base.component';

@Component({
  selector: 'app-sfo',
  templateUrl: './sfo.component.html',
  styleUrls: ['./sfo.component.scss']
})
export class SfoComponent extends MapsBaseComponent implements AfterViewInit {
  @Input() freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() neighbourhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() streets: FeatureCollection<GeometryObject, GeoJsonProperties>;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.projections.center([-122.4194, 37.7749]);
    this.loadGeoJsons();
  }

  loadGeoJsons() {
    this.svg
      .selectAll('path')
      .data(this.freeways.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .style('fill', 'steelblue');
  }
}
