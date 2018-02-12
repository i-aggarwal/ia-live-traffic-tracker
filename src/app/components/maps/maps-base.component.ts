import { OnInit, AfterViewInit } from '@angular/core';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';

export abstract class MapsBaseComponent implements AfterViewInit {
  static template = '<svg></svg>';

  private width = 500;
  private height = 500;
  protected svg: Selection<BaseType, {}, HTMLElement, any>;
  protected projections: d3Geo.GeoProjection;
  protected path: d3Geo.GeoPath<any, any>;

  constructor() {}

  ngAfterViewInit() {
    this.svg = this.initSvg();
    this.projections = this.getProjections();
    this.path = this.getPath();
  }

  protected initSvg() {
    return d3Selection
      .select('svg')
      .append('g')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  protected getProjections(): d3Geo.GeoProjection {
    return d3Geo
      .geoMercator()
      .translate([this.width / 2, this.height / 2])
      .scale(500);
  }

  protected getPath(): d3Geo.GeoPath<any, any> {
    return d3Geo.geoPath().projection(this.projections || this.getProjections());
  }
}
