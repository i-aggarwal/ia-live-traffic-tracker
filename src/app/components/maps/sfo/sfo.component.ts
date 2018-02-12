import { Component, OnInit, Input } from '@angular/core';
import { MapsComponent } from '../maps.component';
import { GeoJsonObject, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import * as d3 from 'd3';

@Component({
  selector: 'app-sfo',
  template: MapsComponent.template,
  styleUrls: ['./sfo.component.css']
})
export class SfoComponent extends MapsComponent implements OnInit {
  @Input() geoJsons: Array<FeatureCollection<GeometryObject, GeoJsonProperties>>;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.projections.center([-122.4194, 37.7749]);
  }

  loadGeoJsons() {
    this.geoJsons.forEach((geoJson: FeatureCollection<GeometryObject, GeoJsonProperties>) => {
      this.svg
        .selectAll('path')
        .data(geoJson.features)
        .enter()
        .append('path')
        .attr('d', this.path);
    });
  }
}
