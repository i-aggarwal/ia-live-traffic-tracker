import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  private width = 1500;
  private height = 625;
  private svg: Selection<BaseType, {}, HTMLElement, any>;
  private projections: d3Geo.GeoProjection;
  private path: d3Geo.GeoPath<any, any>;
  private group: Selection<BaseType, {}, HTMLElement, any>;
  private features: Array<Object> = [];
  private sfo;

  constructor(private elementRef: ElementRef) {
    const jsonA = require('./assets/geoJsons/arteries.json');
    const jsonF = require('./assets/geoJsons/freeways.json');
    const jsonN = require('./assets/geoJsons/neighborhoods.json');
    const jsonS = require('./assets/geoJsons/streets.json');

    this.sfo = jsonN;
    this.features = this.sfo.features;
  }

  ngAfterViewInit() {
    // this.renderMap();
  }

  private renderMap() {
    this.svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.group = this.svg.append('g');

    this.projections = d3Geo
      .geoMercator()
      .scale(1)
      .translate([0, 0])
      .precision(0);

    this.path = d3Geo.geoPath().projection(this.projections);

    // TODO: Ishan - Check how this works!
    const bounds = this.path.bounds(this.sfo);
    const xScale = this.width / Math.abs(bounds[1][0] - bounds[0][0]);
    const yScale = this.height / Math.abs(bounds[1][1] - bounds[0][1]);
    const scale = xScale < yScale ? xScale : yScale;
    const transl = [
      (this.width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (this.height - scale * (bounds[1][1] + bounds[0][1])) / 2
    ];
    // TODO: Ishan - Check how this works!

    this.projections
      .scale(scale)
      .translate([
        (this.width - scale * (bounds[1][0] + bounds[0][0])) / 2,
        (this.height - scale * (bounds[1][1] + bounds[0][1])) / 2
      ]);

    this.group
      .selectAll('path')
      .data(this.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .style('fill', '#FB5B1F')
      .style('stroke', '#ffffff')
      .style('stroke-width', '1px');
  }
}
