import { Component, OnInit, Input, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoJsonObject, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import * as d3 from 'd3';
import { MapsBaseComponent } from '../maps-base.component';

@Component({
  selector: 'app-sfo',
  templateUrl: './sfo.component.html',
  styleUrls: ['./sfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfoComponent extends MapsBaseComponent implements OnInit {
  @Input() freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() neighborhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() streets: FeatureCollection<GeometryObject, GeoJsonProperties>;

  constructor(protected elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit() {
    super.ngOnInit();
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

      this.adjustScales(this.neighborhoods);
      const neighborhoodGroup = this.svg.append('g').attr('id', 'neighborhoods');

      neighborhoodGroup
        .selectAll('path')
        .data(this.neighborhoods.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .style('fill', 'black')
        .style('stroke', '#ffffff')
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
        .style('stroke', 'yellow')
        .style('stroke-width', '1px');
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
        .style('stroke', 'red')
        .style('stroke-width', '1px');
    }
  }
}
