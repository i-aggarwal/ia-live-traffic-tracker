import { Component, OnInit, Input, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GeoJsonObject, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import * as d3 from 'd3';
import { MapsBaseComponent } from '../maps-base.component';
import { RouteConfig } from '../../../live-trafic/services/models/live-traffic.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-sfo',
  templateUrl: './sfo.component.html',
  styleUrls: ['./sfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfoComponent extends MapsBaseComponent implements AfterViewInit {
  @Input() freeways: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() artries: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() neighborhoods: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input() streets: FeatureCollection<GeometryObject, GeoJsonProperties>;
  @Input()
  set routeConfig(rc: { [key: string]: RouteConfig }) {
    this._routeConfig = rc;
    if (rc && Object.keys(rc).length > 0) {
      this.drawVehiclePaths();
    }
  }

  get routeConfig(): { [key: string]: RouteConfig } {
    return this._routeConfig;
  }
  _routeConfig: { [key: string]: RouteConfig };
  constructor(protected elementRef: ElementRef) {
    super(elementRef);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadBaseMap();
    this.drawVehiclePaths();
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

  drawVehiclePaths() {
    if (this.routeConfig) {
      Object.keys(this.routeConfig).forEach((tag: string) => {
        const route = this.routeConfig[tag];
        if (route) {
          const allPaths = route.path;
          const svgGroup = this.svg
            .append('g')
            .attr('id', 'routePath_' + route.tag)
            .attr('class', 'route-path');

          const routePathLayer = document.getElementById('routePath_' + route.tag);
          const svg = document.getElementsByTagName('svg')[0];
          svg.insertBefore(routePathLayer, svg.children[4]);

          allPaths.forEach((path, index) => {
            const links = [];
            const pairs$ = Observable.from(path.point)
              .pairwise().subscribe((pairs) => {
                links.push([
                  this.projections([pairs[0].lon, pairs[0].lat]),
                  this.projections([pairs[1].lon, pairs[1].lat])
                ]);
              });
            svgGroup
              .selectAll('.lineConnect_' + route.tag + '_' + index)
              .data(links)
              .enter()
              .append('line')
              .attr('class', 'lineConnect_' + route.tag + '_' + index)
              .style('stroke', '#' + route.color)
              .style('stroke-width', '1px')
              .attr('x1', function(d) {
                return d[0][0];
              })
              .attr('y1', function(d) {
                return d[0][1];
              })
              .attr('x2', function(d) {
                return d[1][0];
              })
              .attr('y2', function(d) {
                return d[1][1];
              });
          });
        }
      });
    }
  }
}
